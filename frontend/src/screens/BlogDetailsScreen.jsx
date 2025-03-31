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
          {/* Title at the top for all screen sizes */}

          <Row className="d-flex flex-column align-items-center text-center container-blog-details">
          <h3 className="blog-title text-center">{blog.title}</h3>
            {/* Image always in the middle */}
            <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
              <Image 
                src={blog.image}
                alt={blog.title}
                className="image-blog img-fluid rounded"
              />
            </Col>

            {/* Content + Author below the image */}
            <Col xs={12} md={10} lg={8} className="blog-text-container">
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
