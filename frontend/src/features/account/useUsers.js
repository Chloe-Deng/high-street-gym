import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";
import getStoredAuthKey from "../../utils/getStoredAuthKey";

export function useUsers() {
  const authenticationKey = getStoredAuthKey();
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(authenticationKey),
  });

  return { isLoading, error, users };
}
