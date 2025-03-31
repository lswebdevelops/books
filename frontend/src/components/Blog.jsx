import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Card className="my-3 p-3 rounded books-keyframe">
      <Link to={`/blog/${blog._id}`}>
        <Card.Img src={blog.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/blog/${blog._id}`}>
          <Card.Title as="div">
            <p id="blog-title">{blog.title}</p>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Blog;
