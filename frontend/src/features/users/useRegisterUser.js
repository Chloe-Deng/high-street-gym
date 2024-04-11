import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser as registerUserApi } from "../../services/apiUsers";

export function useRegisterUser() {
  const queryClient = useQueryClient();

  const { mutate: registerUser, isLoading: isRegistering } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: () => {
      toast.success("New member successfully registered");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isRegistering, registerUser };
}
