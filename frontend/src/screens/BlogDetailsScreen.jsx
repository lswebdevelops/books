import { useParams } from "react-router-dom";
import { useGetBlogDetailsQuery } from "../slices/blogsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

const BlogDetailsScreen = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useGetBlogDetailsQuery(id);

  return (
    <>
      <Link className="btn btn-light my-3" to="/blogs">
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
          <Row className="d-flex flex-column flex-md-row text-center text-md-start container-blog-details">
            {/* Title on top for small screens */}
            <Col xs={12} className="d-md-none">
              <h3 className="blog-title">{blog.title}</h3>
            </Col>

            {/* Image */}
            <Col md={6}>
              <Image 
                src={blog.image}
                alt={blog.title}
                className="image-blog img-fluid rounded"
              />
            </Col>

            {/* Title, Author, Content */}
            <Col md={6} className="d-flex flex-column justify-content-between blog-text-container">
              {/* Hide title on small screens */}
              <h3 className="blog-title d-none d-md-block">{blog.title}</h3>
              <p className="blog-content">{blog.content}</p>
              <h4 className="blog-author">{blog.author}</h4>
            </Col>
          </Row>

          <hr />
        </>
      )}
    </>
  );
};

export default BlogDetailsScreen;
