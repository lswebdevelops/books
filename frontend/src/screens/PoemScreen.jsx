import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetPoemsQuery, useGetPoemDetailsQuery } from "../slices/poemsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PoemScreen = () => {
  const { id: poemId } = useParams();

  // Chama ambos os hooks sempre, mas "pula" a query que não é necessária.
  const {
    data: poems,
    isLoading: isLoadingPoems,
    error: errorPoems,
  } = useGetPoemsQuery({}, { skip: poemId ? true : false });

  const {
    data: poem,
    isLoading: isLoadingPoem,
    error: errorPoem,
  } = useGetPoemDetailsQuery(poemId, { skip: !poemId });

  // Caso não exista um poemId na URL, mostra a lista de poemas
  if (!poemId) {
    return (
      <>
        <h1>Poemas</h1>
        {isLoadingPoems ? (
          <Loader />
        ) : errorPoems ? (
          <Message variant="danger">
            {errorPoems?.data?.message || errorPoems.error}
          </Message>
        ) : (
          <Row>
            {poems.map((poemItem) => (
              <Col key={poemItem._id} sm={12} md={6} lg={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{poemItem.title}</Card.Title>
                    <Card.Text>
                      Autor: {poemItem.author}
                      <br />
                      <Rating
                        value={poemItem.rating}
                        text={`${poemItem.numReviews} ${
                          poemItem.numReviews === 1 ? "avaliação" : "avaliações"
                        }`}
                      />
                    </Card.Text>
                    <Link to={`/poem/${poemItem._id}`}>Ver detalhes</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </>
    );
  }

  // Se existir um poemId, mostra os detalhes do poema
  return (
    <>
      <Link className="btn btn-light my-3" to="/poems">
        Voltar
      </Link>
      {isLoadingPoem ? (
        <Loader />
      ) : errorPoem ? (
        <Message variant="danger">
          {errorPoem?.data?.message || errorPoem.error}
        </Message>
      ) : (
        <Row className="upper-div-poem">
          <Col md={3} sm={8}>
            {poem.image && <Image src={poem.image} alt={poem.title} fluid />}
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{poem.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>{poem.author}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={poem.rating}
                  text={`${poem.numReviews} ${
                    poem.numReviews === 1 ? "avaliação" : "avaliações"
                  }`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Resenha:</strong> {poem.content}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Rating:</Col>
                    <Col>
                      <strong>{poem.rating}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {poem.numReviews > 0
                          ? "Tem avaliações"
                          : "Nenhuma Avaliação"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PoemScreen;
