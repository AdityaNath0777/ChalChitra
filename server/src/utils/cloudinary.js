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

const deleteFromCloudinary = async (fileURL, fileType) => {
  if (!fileType) {
    fileType = "image";
  }
  const publicId = fileURL?.split("/")?.pop()?.split(".")?.[0];

  const options = {
    resource_type: fileType,
    type: "upload",
    invalidate: true,
  };

  try {
    const result = await cloudinary.uploader.destroy(publicId, options);
    console.log("result: ", result);
    return result;
  } catch (err) {
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
