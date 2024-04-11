import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../../services/apiUsers";
import { getStoredAuthKey } from "../../utils/getStoredAuthKey";

export function useUser(userID, authKey) {
  const authenticationKey = getStoredAuthKey();
  console.log(authenticationKey);

  const {
    isLoading,
    data: userData,
    error,
  } = useQuery({
    queryKey: ["users", userID],
    queryFn: () => getUserByID(userID, authKey),
    enabled: !!userID && !!authenticationKey,
  });

  return { isLoading, userData, error };
}
