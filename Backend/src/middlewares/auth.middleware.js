import { ApiError } from "../services/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the header
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized: Invalid token must be provided"));
  }
};

export { verifyJWT };
