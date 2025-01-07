import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBook,
  deleteAuthorBook,
  getAllBooks,
  getAuthorAllBooks,
  getAuthorSingleBook,
  getSingleBook,
  updateAuthorBook,
  updateBookRating,
} from "../controllers/book.controller.js";

const router = Router();


router.route("/create-book").post(verifyJWT,
  multerUpload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  createBook
);

router.route("/").get(getAllBooks);
router.route("/single-book/:id").get(getSingleBook);
router.route("/rating/:id").patch(updateBookRating);

router.route("/author-all-books").get(verifyJWT, getAuthorAllBooks)
router.route("/author-single-book/:id").get(verifyJWT, getAuthorSingleBook)
router.route("/update-book/:id").patch(verifyJWT,updateAuthorBook);
router.route("/delete-book/:id").delete(verifyJWT,deleteAuthorBook);

export default router;
