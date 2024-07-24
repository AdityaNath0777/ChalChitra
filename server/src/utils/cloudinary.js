import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    // console.log("file has been uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    
    // console.log("cloudinary response :: ", response);
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the temp. saved file as the upload operation got failed

    return null;
  }
};

// ;
// // ;
// // // cloudinary.uploader.upload(
// // //   "",
// // //   {
// // //     public_id: "",
// // //   },
// // //   // function (error, result) {
// // //   //   console.log(result);
// // //   // }
// // // );


export { uploadOnCloudinary };
