import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import BlogItem from "./BlogItem";
import { usePosts } from "./usePosts";

function BlogList() {
  const { isLoading, posts } = usePosts();
  console.log(posts);
  if (isLoading || !posts) return <Loader />;

  return (
    <div className="px-4 py-3">
      <h2 className="mb-5 mt-7 px-2 text-xl font-bold sm:text-2xl md:px-4">
        Blog
      </h2>

      <Button type="small" to="/blog/new">
        New post
      </Button>

      <ul className="mt-3 divide-y divide-zinc-200 border-b">
        {posts.map((post) => (
          <BlogItem post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
