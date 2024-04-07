import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useCreatePost } from "./useCreatePost";

function CreateBlog() {
  const { isCreating, createPost } = useCreatePost();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    const postData = {
      postTitle: data.title,
      postContent: data.content,
      userName: data.author, // 确保后端通过userName查找用户ID
    };
    // console.log(postData);
    createPost(postData, {
      onSuccess: (data) => {
        reset();
      },
    });
  }

  return (
    <div className="px-2 py-4 sm:px-4 sm:py-6">
      <h1 className="px-4 text-xl font-bold sm:px-8 sm:text-2xl">New Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-8 rounded-lg p-4 sm:p-8"
      >
        <div className="flex flex-col gap-0.5">
          <label className="text-base" htmlFor="title">
            Title
          </label>
          <input
            className="w-full rounded-md border border-zinc-200 p-2.5 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
            type="text"
            id="title"
            disabled={isCreating}
            {...register("title", {
              required: "Title field is required",
            })}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="content">Content</label>
          <textarea
            className="w-full rounded-md border border-zinc-200 p-2.5 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
            required
            rows="10"
            type="text"
            id="content"
            disabled={isCreating}
            {...register("content", {
              required: "Content field is required",
            })}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="author">Author</label>
          <input
            className="w-full rounded-md border border-zinc-200 p-2.5 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
            type="text"
            id="author"
            disabled={isCreating}
            {...register("author", {
              required: "Author field is required",
            })}
          />
        </div>
        <div className="mt-6 flex justify-center space-x-2">
          <Button type="secondary" to="/blog">
            Back
          </Button>
          <Button type="primary" disabled={isCreating}>
            Create Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
