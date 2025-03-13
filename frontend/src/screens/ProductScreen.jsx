import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart"); // Use navigate to redirect
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Voltar
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row className="upper-div-product">
            <Col md={3} sm={8}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/*  category > autor */}
                  <h4>{product.category}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ${
                      product.numReviews === 1 ? "avaliação" : "avaliações"
                    }`}
                  />
                </ListGroup.Item>

                {/* <ListGroup.Item>
                  Preço: R$&nbsp;{product.price.toFixed(2).replace('.',',')} + frete
                </ListGroup.Item> */}
                <ListGroup.Item className="book-description">
                   {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Preço:</Col>
                      <Col>
                        <strong>R$&nbsp;{product.price.toFixed(2).replace('.',',')}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "Em estoque"
                            : "Fora de estoque"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <Row className="available-books">
                      <Col>Disponíveis: {product.countInStock}</Col>
                    </Row>
                  )}
                  {product.countInStock > 0 && (
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      <a
                        href="https://www.mercadolivre.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Mercado Livre
                      </a>
                    </Button>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <hr />
          <Row className="review">
            <Col md={6}>
              <h2>Avaliações</h2>
              {product.reviews.length === 0 && (
                <Message>Nenhuma Avaliação</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>
                      {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Deixe sua Avaliação</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Avaliações</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          <option value="1">1 - Ruim</option>
                          <option value="2">2 - Regular</option>
                          <option value="3">3 - Bom</option>
                          <option value="4">4 - Muito Bom</option>
                          <option value="5">5 - Excelente</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comentário</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          maxLength="330"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Salvar
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Por favor, <Link to="/login">logue aqui</Link> para deixar
                      sua avaliação
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
