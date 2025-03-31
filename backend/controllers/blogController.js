import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";

// @desc Fetch all blogs
// @route get /api/blogs
// @access Public

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 }); // newest books first

  res.json({ blogs });
});

// @desc Fetch a blog
// @route get /api/blogs/:id
// @access Public

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Recurso não encontrado.");
  }
});

// @desc create a new blog
// @route post /api/blogs
// @access private admin

const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    title: "Novo Blog",
    image: "/images/newblogpost.jpg",
    author: "Harry Wiese",
    content: "Sample é o destino perfeito para mentes curiosas que buscam inspiração, conhecimento e entretenimento. Com artigos envolventes sobre tecnologia, cultura, ciência e estilo de vida, nosso blog traz análises aprofundadas, dicas práticas e reflexões instigantes sobre o mundo moderno. Seja para descobrir novas tendências, explorar ideias inovadoras ou simplesmente encontrar uma boa leitura, o Blog Sample é o seu ponto de encontro com o conhecimento.",
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc update a blog
// @route PUT  /api/blog/:id
// @access private admin

const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, image, author } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.content = content;
    blog.image = image;
    blog.author = author;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc delete a blog
// @route delete  /api/blog/:id
// @access private admin

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.status(200).json({ message: "Blog deletado" });
  } else {
    res.status(404);
    throw new Error("Recurso não encontrado");
  }
});

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
