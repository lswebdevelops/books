import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route get /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
  .sort({ createdAt: -1})// newest books first
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch a product
// @route get /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Recurso não encontrado.");
  }
});

// @desc create a new product
// @route post /api/products
// @access private admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Título da obra",
    price: 0,
    user: req.user._id,
    image: "/images/samplebook2.png",
    brand: "Editora X",
    category: "Harry Wiese",
    countInStock: 0,
    numReviews: 0,
    description: "Thriller psicológico envolvente que mergulha nas profundezas da mente humana e das escolhas morais em meio ao caos.Quando o renomado neurocientista Dr. Alan Reeves descobre um experimento secreto capaz de reprogramar a memória, ele se vê dividido entre a ética e a ambição. Mas sua pesquisa atrai a atenção de uma organização misteriosa que deseja usar sua invenção para fins obscuros. À medida que Alan luta para proteger seu trabalho, ele começa a questionar sua própria realidade. Memórias antes sólidas se tornam distorcidas, pessoas próximas a ele agem de forma estranha, e a linha entre verdade e ilusão começa a se desfazer. Com reviravoltas surpreendentes e um ritmo eletrizante, Book Sample desafia o leitor a questionar: e se suas lembranças não fossem realmente suas?",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update a product
// @route PUT  /api/product/:id
// @access private admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc delete a product
// @route delete  /api/product/:id
// @access private admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Livro deletado" });
  } else {
    res.status(404);
    throw new Error("Recurso não encontrado");
  }
});

// @desc create a new review
// @route post  /api/products/:id/reviews
// @access private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Obra já avaliada.");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Avaliação adicionada" });
  } else {
    res.status(404);
    throw new Error("Recurso não encontrado");
  }
});

// @desc get top rated product
// @route get /api/products/top
// @access Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
