import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
//import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createBook, 
    deleteBook, 
    getAllBooks, 
    getSingleBook,
    updateBook
} from "../controllers/book.controller.js";

const router = Router();

//router.use(verifyJWT);

router.route("/create-book").post(
    multerUpload.fields([
        {
            name: "file",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        },
    ]),
    createBook)

router.route("/").get(getAllBooks)
router.route("/single-book/:id").get(getSingleBook)
router.route("/update-book/:id").patch(updateBook)
router.route("/delete-book/:id").delete(deleteBook)

export default router;
