import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
//import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createBook, 
    getAllBooks 
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

export default router;
