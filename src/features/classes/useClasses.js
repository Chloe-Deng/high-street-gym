import { useQuery } from "@tanstack/react-query";
import { getClassDetails } from "../../services/apiClasses";

export function useClasses() {
  const { isLoading, data: classes } = useQuery({
    queryKey: ["class"],
    queryFn: getClassDetails,
  });

  return { isLoading, classes };
}
