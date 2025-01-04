import { Book } from "../models/book.model.js";
import { ApiError } from "../services/ApiError.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";


//----------------------Create Book--------------------
const createBook = asyncHandler(async (req, res) => {

    const {title, description, genre, author, rating} = req.body;

    if (!title || !description || !genre || !author) {
        throw new ApiError(400, "All fields are required")
    }

   try {
    const fileLocalPath = req.files?.file?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
 
   if (!fileLocalPath || !coverImageLocalPath) {
     throw new ApiError(400, "Cover-image and file is required...!!");
   }
 
   const file = await uploadOnCloudinary(fileLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
 
   if (!file || !file.url) {
     throw new ApiError(400, "File upload failed on cloudinary");
   }
   if (!coverImage || !coverImage.url) {
    throw new ApiError(400, "Cover Image upload failed on cloudinary");
  }
 
   const book = await Book.create({
     title,
     description,
     genre,
     author,
     rating,
     file: file.url,
     coverImage: coverImage.url,
   });
 
   return res
     .status(201)
     .json(new ApiResponse(200, book, "Book created successfully"));

   } catch (error) {
    console.log(error);
    throw new ApiError(400, error.message || "Error something went wrong..?");
   }
});

//----------------------Get all books-------------------
const getAllBooks = asyncHandler(async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await Book.find();
    return res
    .status(200)
    .json(new ApiResponse(200, books, "Books fetched successfully"))
    
  } catch (error) {
    return res
    .status(500)
    .json({
      success: false,
      message: "Failed to retrieve books",
      error: error.message,
    });
  }
});

//----------------------Get single books----------------
const getSingleBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  if (!bookId) {
    throw new ApiError(400, "Invalid book id")
  }

  try {
    // Fetch single book from the database
    const book = await Book.findById(bookId);
    return res
    .status(200)
    .json(new ApiResponse(200, book, "Book fetched successfully"))
    
  } catch (error) {
    return res
    .status(500)
    .json({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
});

//----------------------Update a book-------------------
const updateBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const {title, description, genre, author} = req.body;

  if (!bookId) {
    throw new ApiError(400, "Invalid book id")
  }
  if (!title || !description || !genre || !author) {
    throw new ApiError(400, "All fields are required")
  }

  try {
    // Fetch single book from the database
    const book = await Book.findByIdAndUpdate(bookId, 
      {
        $set: {title, description, genre, author}
      },
      {new: true}
    );
    return res
    .status(200)
    .json(new ApiResponse(200, book, "Book Update successfully"))
    
  } catch (error) {
    return res
    .status(500)
    .json({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
});

//----------------------Get Author Book-----------------
const getAuthorBook = asyncHandler(async (req, res) => {
  const author = req.params.author;

  if (!author) {
    throw new ApiError(400, "Invalid author")
  }

  try {
    // Fetch single book from the database
    const book = await Book.find({author});
    return res
    .status(200)
    .json(new ApiResponse(200, book, "Author Book fetched successfully"))
    
  } catch (error) {
    return res
    .status(500)
    .json({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
});

//----------------------Delete a book-------------------
const deleteBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  if (!bookId) {
    throw new ApiError(400, "Invalid book id")
  }

  try {
    // Fetch single book from the database
    const book = await Book.findByIdAndDelete(bookId);
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Book deleted successfully"))
    
  } catch (error) {
    return res
    .status(500)
    .json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
});

//----------------------Update Book Rating-------------------
const updateBookRating = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const { rating } = req.body;

  if (!bookId) {
    throw new ApiError(400, "Invalid book id");
  }
  if (rating == null) {
    throw new ApiError(400, "Rating is required");
  }

  try {
    // Update book rating in the database
    const book = await Book.findByIdAndUpdate(
      bookId,
      { rating },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, book, "Book rating updated successfully"));
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update book rating",
      error: error.message,
    });
  }
});


export {
  createBook, 
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  updateBookRating,
}
