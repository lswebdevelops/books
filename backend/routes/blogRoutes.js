import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addCommentToBlog,
  uploadImage, // ✅ Pode deixar só aqui
} from "../controllers/blogController.js";



const router = express.Router();

router.route("/").get(getBlogs).post(protect, admin, createBlog);

// rota de upload de imagem
router.post("/upload", protect, admin, upload.single("image"), uploadImage);

router
  .route("/:id")
  .get(checkObjectId, getBlogById)
  .put(protect, admin, checkObjectId, updateBlog)
  .delete(protect, admin, checkObjectId, deleteBlog);

router.route("/:id/comments").post(protect, addCommentToBlog);

export default router;
