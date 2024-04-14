import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

// Custom hook
export function useDeleteUser() {
  // Call the queryClient and then call invalidate queries
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,

    // After mutating the data, we need to invalidate the cache, which means re-fetch the data from the database, then the UI will automatically update
    onSuccess: () => {
      toast.success("User successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    // This error handler get access to the error object in the mutation function (deleteCabin)
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
}
