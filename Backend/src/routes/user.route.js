import { Router } from "express";
import {multerUpload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {
  changePassword,
  getCurrentUser,
  loginUser, 
  logoutUser, 
  refreshAccessToken, 
  registerUser,
  updateProfileDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js"
 
const router = Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/get-user").get(verifyJWT, getCurrentUser)
router.route("/update-profile").patch(verifyJWT, updateProfileDetails)
router.route("/update-avatar").patch(verifyJWT, multerUpload.single("avatar"), updateUserAvatar)

export default router;
