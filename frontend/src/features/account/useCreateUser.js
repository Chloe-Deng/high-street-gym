import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUser as createUserApi } from "../../services/apiUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: isCreating } = useMutation({
    // In react, we can only pass one argument in mutationFn, so we pass in an object contain these two variables and destructure it
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("User successfully created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      // console.log(err);
      toast.error(err.message);
    },
  });

  return { isCreating, createUser };
}
