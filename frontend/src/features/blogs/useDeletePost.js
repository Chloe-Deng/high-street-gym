import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";

// Custom hook
export function useDeletePost() {
  // Call the queryClient and then call invalidate queries
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,

    // After mutating the data, we need to invalidate the cache, which means re-fetch the data from the database, then the UI will automatically update
    onSuccess: () => {
      toast.success("Post successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    // This error handler get access to the error object in the mutation function (deletePost)
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePost };
}
