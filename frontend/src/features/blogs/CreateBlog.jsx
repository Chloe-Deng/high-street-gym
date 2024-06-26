import { useForm } from "react-hook-form";
import { useCreatePost } from "./useCreatePost";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
// import CreateBlogForm from "./CreateBlogForm";

function CreateBlog() {
  const { user } = useAuth();
  const { isCreating, createPost } = useCreatePost();
  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;
  const { firstName } = user;

  useEffect(() => {
    reset({
      author: firstName,
    });
  }, [firstName, reset]);

  function onSubmit(data) {
    const postData = {
      postTitle: data.title,
      postContent: data.content,
      userName: data.author,
    };
    // console.log(postData);
    createPost(postData, {
      onSuccess: (data) => {
        // console.log(data);
        reset();
      },
    });
  }

  return (
    <div className="px-2 py-4 sm:px-4 sm:py-6">
      <h1 className="px-4 text-xl font-bold sm:px-8 sm:text-2xl">New Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5 rounded-lg p-4 sm:p-8"
      >
        <FormRow label="Title" error={errors?.title?.message}>
          <input
            className="input-square"
            type="text"
            id="title"
            disabled={isCreating}
            {...register("title", {
              required: "Title field is required",
            })}
          />
        </FormRow>
        <FormRow label="Content" error={errors?.content?.message}>
          <textarea
            className="input-square"
            type="text"
            id="content"
            rows="10"
            disabled={isCreating}
            {...register("content", {
              required: "Content field is required",
            })}
          />
        </FormRow>

        <FormRow error={errors?.author?.message}>
          <input
            className="input-square"
            type="text"
            id="author"
            name="author"
            hidden
            // defaultValue={user.firstName}
            disabled={isCreating}
            {...register("author", {
              required: "Author field is required",
            })}
          />
        </FormRow>

        <div className=" flex justify-center space-x-2">
          <Button variation="primary" disabled={isCreating}>
            Create Post
          </Button>
          <Button variation="secondary" to="/blog">
            Back
          </Button>
        </div>
      </form>
      {/* <CreateBlogForm isCreating={isCreating} onSubmit={onSubmit} /> */}
    </div>
  );
}

export default CreateBlog;
