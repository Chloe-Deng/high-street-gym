import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiUsers";
import { useAuth } from "../../contexts/AuthContext";

// import getStoredAuthKey from "../../utils/getStoredAuthKey";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { updateUserProfile } = useAuth();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // In react, we can only pass one argument in mutationFn, so we pass in an object contain these two variables and destructure it
    mutationFn: updateUserApi,
    onSuccess: (updatedUserData) => {
      toast.success("User successfully updated");

      updateUserProfile(updatedUserData.user);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
