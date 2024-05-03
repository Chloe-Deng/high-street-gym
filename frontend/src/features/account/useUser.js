import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../../services/apiUsers";
import getStoredAuthKey from "../../utils/getStoredAuthKey";

export function useUser(userID) {
  const authenticationKey = getStoredAuthKey();

  const {
    isLoading,
    data: userData,
    error,
  } = useQuery({
    queryKey: ["users", userID],
    queryFn: () => getUserByID(userID, authenticationKey),
    enabled: !!userID && !!authenticationKey,
  });

  return { isLoading, userData, error };
}
