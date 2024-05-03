import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUser as createUserApi } from "../../services/apiUsers";

function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: isCreatingUser } = useMutation({
    // In react, we can only pass one argument in mutationFn, so we pass in an object contain these two variables and destructure it
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("User successfully created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      if (err.code === 403) {
        toast.error(
          "You are not authorized to perform this action! Please log in as administrator.",
        );
      } else {
        toast.error(
          err.message || "An error occurred during the registration process.",
        );
      }
    },
  });

  return { isCreatingUser, createUser };
}

export default useCreateUser;
