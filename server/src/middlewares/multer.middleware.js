import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb -> callback fn
    // pass args -> cb (err, dest)
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // cb(error, filename)
    cb(null, file.originalname);
    // file has more methods, try them!!
    // cb(null, file.fieldname);
  },
});

export const upload = multer({
  storage,
});
