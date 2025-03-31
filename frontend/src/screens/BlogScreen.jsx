import { Row, Col } from "react-bootstrap";
import { useGetBlogsQuery } from "../slices/blogsApiSlice";
import { Link } from "react-router-dom";
import Blog from "../components/Blog";
import Loader from "../components/Loader";
import Message from "../components/Message";

const BlogScreen = () => {
  const { data, isLoading, error } = useGetBlogsQuery();
  
  
  return (
    <div className="homeScreen">
       <Link to="/" className="btn btn-light mb-4">
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
          <h1 className="booksPageH1">Blogs</h1>
          <Row>
            {data.blogs.map((blog) => (
              <Col key={blog._id} sm={12} md={6} lg={4} xl={3}>
                <Blog blog={blog} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default BlogScreen;
