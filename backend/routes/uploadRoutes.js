import path from "path";
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";

const router = express.Router();

// Configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer temp local storage
const storage = multer.diskStorage({ destination: "uploads/" });
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true); else cb(new Error("Images only!"), false);
};
const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // delete temp file
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
