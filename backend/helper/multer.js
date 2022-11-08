import multer from "multer";
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|mpeg|gif$i/)) {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
export default upload;
