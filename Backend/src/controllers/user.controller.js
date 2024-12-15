import { asyncHandler } from "../services/asyncHandler.js";
import { ApiError } from "../services/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiResponse } from "../services/ApiResponse.js";
import jwt from "jsonwebtoken";

 
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken(); 
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    //console.log("user.save: " + user.save)
 
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh token"
    );
  }
};


//--------------------Register User--------------------
const registerUser = asyncHandler(async (req, res) => {

  console.log("Request Body: +", req.body);
  const { userName, email, password } = req.body;

  //1. --------validate user details---------
  if ([userName, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields must be required");
  }

  //2. check if user already exists: email
  //const existedUser = await User.findOne({ email });
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  })

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //5. create user object: create entity in db
  const user = await User.create({
    userName,
    email,
    password,
  });

  //6. remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //7. check for user creation response
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong");
  }

  //8. return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

//--------------------Login User-----------------------
const loginUser = asyncHandler(async (req, res) => {
  //1. req body -> Data
  //2. req username or email
  //3. find user by username, email
  //4. password check
  //5. access and refresh token
  //6. send cookies
  //7. send response

  const { email, password } = req.body;

  if (!req.body) {
    throw new ApiError(400, "Username or password required");
  }

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrected(password);
  console.log("user.isPasswordCorrected:" + user.isPasswordCorrected)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .cookie("access_token", accessToken, options)
    .cookie("refresh_token", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
})

//--------------------Logged out User------------------
const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

//--------------------Refresh and Access Token----------
const refreshAccessToken = asyncHandler(async (req, res) => {

  //1. get the cookie from user refresh token
  const userIncomingRefreshToken = req.cookies.refresh_token || req.body.refresh_token;
     
  if (!userIncomingRefreshToken) {
    throw new ApiError(401, "You have no refresh token");
  }

  try {
    //2. decoded the user refresh token
    const decodedToken = jwt.verify(userIncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
 
    //3. find user by user id from decoded token
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid user refresh token");
    }

    //4. match the userIncomingRefreshToken and user stored in DB refreshToken
    if (!(userIncomingRefreshToken == await user?.refreshToken)) {
      throw new ApiError(401, "Refresh token is expired or used over");
    }

    //5. generate new access and refresh token for user
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);
      //console.log("accessToken: " + accessToken)
      //console.log("newRefreshToken: " + newRefreshToken)

    const options = {
      httpOnly: true,
      secure: true,
    }

    return res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      )

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }

})

//--------------------Change Password-------------------
const changePassword = asyncHandler(async (req, res) => {

  const {oldPassword, newPassword, conformPassword} = req.body

  if (!(newPassword === conformPassword)) {
    throw new ApiError(401, "Invalid conformPassword")
  }

    try {
      const user = await User.findById(req.user?._id)
    
      const isPasswordCorrected = await user.isPasswordCorrected(oldPassword)
       
      if (!isPasswordCorrected) {
        throw new ApiError(400, "Invalid old password")
      }
    
      user.password = newPassword
      await user.save({ validateBeforeSave: false })
    
      return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"))
  
    } catch (error) {
      throw new ApiError(500, error?.message || "Something went wrong")
    }
})

//--------------------Get Current User------------------
const getCurrentUser = asyncHandler(async (req, res) => {

  return res
  .status(200)
  .json(new ApiResponse(200, req.user, "Current user fetched successfully"))
  
})

//--------------------Update Profile Details------------
const updateProfileDetails = asyncHandler(async (req, res) => {

  const {userName, fullName} = req.body

  if (!userName || !fullName) {
    throw new ApiError(400, "username or fullname is required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { userName, fullName }
    },
    {
      new: true
    }
  ).select("-password")

  return res
  .status(200)
  .json( new ApiResponse(200, user, "Profile details updated successfully"))

})

//--------------------Update Avatar--------------------
const updateUserAvatar = asyncHandler(async (req, res) => {

  const avatarLocalPath = req.file?.path;
  console.log("avatarLocalPath:"+ avatarLocalPath);

  if(!avatarLocalPath){
    throw new ApiError(400, "Profile image is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  // console.log("avatar: " + avatar)

  if(!avatar || !avatar.url){
    throw new ApiError(400, "Image file is missing...")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {avatar: avatar.url}
    },
    {
      new: true
    }
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200, user, "Profile avatar image update successfully"))
})

//--------------------Update Cover Image---------------
const updateUserCoverImage = asyncHandler(async (req, res) => {

  const coverImageLocalPath = await req.file?.path;

  if(!coverImageLocalPath) {
    throw new ApiError(400, "Profile cover image is required")
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!coverImage || !coverImage.url){
    throw new ApiError(400, "Image file is missing...")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {coverImage: coverImage.url}
    },
    {
      new: true
    }
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200, user, "Profile cover image update successfully"))
})




export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateProfileDetails,
  updateUserAvatar,
  updateUserCoverImage,
}