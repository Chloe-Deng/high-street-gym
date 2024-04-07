import { useEffect } from "react";
import { getPosts } from "../services/apiPosts";
import BlogList from "../features/blogs/BlogList";

function Blog() {
  useEffect(function () {
    getPosts().then((data) => console.log(data));
  }, []);

  return (
    <>
      <BlogList />
    </>
  );
}

export default Blog;
