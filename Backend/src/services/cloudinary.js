import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dsianyb39",
  api_key: "545611663964254",
  api_secret: "n8jEz3PPjPjob_oKa1u-CIcL0qs",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    
    if (!localFilePath) return "Image file not found";

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    console.log("file uploaded on cloudinary:" + result.url);

    fs.unlinkSync(localFilePath);
    return result;
  
} catch (error) {
    fs.unlinkSync(localFilePath);

    return "server file unlink successfully";
  }
};

export { uploadOnCloudinary };
