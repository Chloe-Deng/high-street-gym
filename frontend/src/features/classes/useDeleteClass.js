import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClass as deleteClassApi } from "../../services/apiClasss";
import toast from "react-hot-toast";

// Custom hook
export function useDeleteClass() {
  // Call the queryClient and then call invalidate queries
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteClass } = useMutation({
    mutationFn: deleteClassApi,

    // After mutating the data, we need to invalidate the cache, which means re-fetch the data from the database, then the UI will automatically update
    onSuccess: () => {
      toast.success("Class successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["Classes"],
      });
    },
    // This error handler get access to the error object in the mutation function (deleteCabin)
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteClass };
}
