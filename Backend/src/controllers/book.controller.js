import { Book } from "../models/book.model.js";
import { ApiError } from "../services/ApiError.js";
import { ApiResponse } from "../services/ApiResponse.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";


//----------------------Create Book--------------------
const createBook = asyncHandler(async (req, res) => {

    const {title, description, genre} = req.body;
    const userId = req.user?._id;

    if (!title) {
        throw new ApiError(400, "Title is required")
    }

   try {
     const fileLocalPath = await req.files?.file[0]?.path;
 
   let coverImageLocalPath;
   if (
     req.files &&
     Array.isArray(req.files.coverImage) &&
     req.files.coverImage.length > 0
   ) {
     coverImageLocalPath = await req.files?.coverImage[0]?.path;
   }
 
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
     authorId: userId,
     author: req.user.userName,
     file: file.url,
     coverImage: coverImage?.url,
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

// const getAllBooks = asyncHandler(async (req, res) => {
//   try {
//     const books = await Book.find({ userId: req.user.id }); // Only books belonging to the logged-in user
//     res.status(200).json({ success: true, data: books });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve books",
//       error: error.message,
//     });
//   }
// });
 

//   const book = await book.find().populate("author", "name");
 

export {
  createBook, 
  getAllBooks
}
