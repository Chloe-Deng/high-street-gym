import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
// import { useCreatePost } from "./useCreatePost";

function CreateBlogForm({ isCreating, onSubmit }) {
  // const { isCreating, createPost } = useCreatePost();
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  // function onSubmit(data) {
  //   const postData = {
  //     postTitle: data.title,
  //     postContent: data.content,
  //     userName: data.author, // 确保后端通过userName查找用户ID
  //   };
  //   // console.log(postData);
  //   createPost(postData, {
  //     onSuccess: (data) => {
  //       reset();
  //     },
  //   });
  // }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-full flex-col gap-8 rounded-lg p-4 sm:p-8"
    >
      <div className="flex flex-col gap-0.5">
        <label className="text-base" htmlFor="title">
          Title
        </label>
        <input
          className="input-square"
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
          className="input-square"
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
          className="input-square"
          type="text"
          id="author"
          disabled={isCreating}
          {...register("author", {
            required: "Author field is required",
          })}
        />
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        <Button type="primary" disabled={isCreating}>
          Create Post
        </Button>
        <Button type="secondary" to="/blog">
          Back
        </Button>
      </div>
    </form>
  );
}

export default CreateBlogForm;
