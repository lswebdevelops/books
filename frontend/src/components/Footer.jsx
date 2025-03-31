import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaBook,
  FaProjectDiagram,
  FaFeatherAlt,
  FaUserAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-harry">
      <Container fluid>
        <Row>
          <Col className="text-center py-3">
            <p>HARRY WIESE &copy; {currentYear}</p>
            <div className="d-flex justify-content-center flex-wrap">
              {/* <Link to="/">Home</Link> &nbsp;|&nbsp;
               */}
              <Link as={Link} to="/" className="d-flex align-items-center me-3">
                <FaHome size={20} className="d-lg-none" />
                <span className="ms-2 d-none d-lg-inline">Home</span>
              </Link>
              {/* <Link to="/poems">Poemas</Link> &nbsp;|&nbsp; */}
              <Link
                as={Link}
                to="/poems"
                className="d-flex align-items-center me-3"
              >
                <FaFeatherAlt size={20} className="d-lg-none" />
                <span className="ms-2 d-none d-lg-inline">Poemas</span>
              </Link>
              {/* <Link to="/books">Livros</Link> &nbsp;|&nbsp; */}
              <Link
                as={Link}
                to="/books"
                className="d-flex align-items-center me-3"
              >
                <FaBook size={20} className="d-lg-none" />
                <span className="ms-2 d-none d-lg-inline">Livros</span>
              </Link>
              {/* <Link to="/upcoming">Projetos</Link> &nbsp;|&nbsp; */}
              <Link
                as={Link}
                to="/upcoming"
                className="d-flex align-items-center me-3"
              >
                <FaProjectDiagram size={20} className="d-lg-none" />
                <span className="ms-2 d-none d-lg-inline">Projetos</span>
              </Link>
              {/* <Link to="/books">Livros</Link> &nbsp;|&nbsp; */}

              <Link
                as={Link}
                to="/books"
                className="d-flex align-items-center me-3"
              >
                <FaBook size={20} className="d-lg-none" />
                <span className="ms-2 d-none d-lg-inline">Livros</span>
              </Link>


              <Link
                as={Link}
                to="/blogs"
                className="d-flex align-items-center"
              >
                <FaUserAlt size={20} className="d-lg-none" />
                <span className="ms-2 d-none d-lg-inline">Blog</span>
              </Link>
              
              {/* <Link to="/biography">Autor</Link>&nbsp;|&nbsp; */}
              <Link
                as={Link}
                to="/biography"
                className="d-flex align-items-center"
              >
                <FaUserAlt size={20} className="d-lg-none" />
                <span className="ms-2 d-none d-lg-inline">Autor</span>
              </Link>
            

              <div className="footer-top-container">
                <a href="#top">
                  <FaArrowUp />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
