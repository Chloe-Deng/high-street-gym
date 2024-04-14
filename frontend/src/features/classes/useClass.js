import { useQuery } from "@tanstack/react-query";
import { getClass } from "../../services/apiClasses";

export function useClass(classID) {
  const {
    isLoading,
    data: classData,
    error,
  } = useQuery({
    queryKey: ["class", classID],
    queryFn: () => getClass(classID),
    enabled: !!classID, // This ensures the query only runs when classID is available
  });

  return { isLoading, classData, error };
}
