import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createClass as createClassApi } from "../../services/apiClasses";
// import getStoredAuthKey from "../../utils/getStoredAuthKey";

function useCreateClass() {
  const queryClient = useQueryClient();

  const { mutate: createClass, isLoading: isCreating } = useMutation({
    mutationFn: createClassApi,
    onSuccess: () => {
      toast.success("New class successfully created");
      // Invalidate and refetch the queries related to classes to get the updated data
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (err) => {
      // Handle the error with a toast notification
      toast.error(`Error: ${err.message}`);
    },
  });

  return { createClass, isCreating };
}

export default useCreateClass;
