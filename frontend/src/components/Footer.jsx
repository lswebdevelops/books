import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-harry">
      <Container fluid>
        <Row>
          <Col className="text-center py-3">
            <p>HARRY WIESE &copy; {currentYear}</p>
            <div>
              <Link to="/">Home</Link> &nbsp;|&nbsp;
              <Link to="/books">Livros</Link> &nbsp;|&nbsp;
              <Link to="/poems">Poemas</Link> &nbsp;|&nbsp;
              {/* <Link to="/books">Livros</Link> &nbsp;|&nbsp; */}
              <Link to="/biography">Sobre o Autor</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
