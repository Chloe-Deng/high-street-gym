import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost as createPostApi } from "../../services/apiPosts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      toast.success("New post successfully created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPost };
}
