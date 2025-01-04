import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.access_token || 
        req.header("Authorization")?.replace("Bearer", "")
        if (!token) {
            throw new ApiError(401, "Access denied. No token provided")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).
        select("-password -refreshToken")
        
        console.log("User: ", user)
        console.log("decodedToken:", decodedToken?._id)
        if (!user) {
            throw new ApiError(403, "Unauthorized user..?")
        }
    
        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(401, "Invalid Access Token..!" || error?.message )
        
    }

 })

export {verifyJWT}



 