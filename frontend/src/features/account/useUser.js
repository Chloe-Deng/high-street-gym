import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../../services/apiUsers";
import getStoredAuthKey from "../../utils/getStoredAuthKey";

export function useUser(userID) {
  // 直接在这里获取 authenticationKey，而不是作为参数传递
  const authenticationKey = getStoredAuthKey();

  const {
    isLoading,
    data: userData,
    error,
  } = useQuery({
    queryKey: ["users", userID],
    queryFn: () => getUserByID(userID, authenticationKey), // 确保按照函数定义传递参数
    enabled: !!userID && !!authenticationKey, // 查询仅在 userID 和 authenticationKey 有效时启用
  });

  return { isLoading, userData, error };
}
