function BlogItem({ post }) {
  const { postAt, postTitle, postContent, userName } = post;

  return (
    <li className="flex flex-col px-2 py-4 md:px-4">
      <h1 className="mb-1 font-semibold sm:mb-2">{postTitle}</h1>
      <p className="mb-4 text-xs text-zinc-500">{postAt}</p>

      <p className="mb-4 text-sm">{postContent}</p>
      <p className="text-xs text-zinc-500">By: {userName}</p>
    </li>
  );
}

export default BlogItem;
