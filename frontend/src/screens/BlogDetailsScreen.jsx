import { useParams } from "react-router-dom";
import { useGetBlogDetailsQuery } from "../slices/blogsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const BlogDetailsScreen = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useGetBlogDetailsQuery(id);

  return (
    <div>

        <Link to="/blogs" className="btn btn-light mb-4">
            Voltar
          </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>{blog.title}</h1>
          <img src={blog.image} alt={blog.title} />
          <p>{blog.content}</p>
          <p>Author: {blog.author}</p>
        </>
      )}
    </div>
  );
};

export default BlogDetailsScreen;
