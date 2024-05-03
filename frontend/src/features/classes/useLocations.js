import { useQuery } from "@tanstack/react-query";
import { getLocationsByTrainerNameAndClass } from "../../services/apiClasses";

export function useLocations(trainerName, classId) {
  const { isLoading: isLoadingLocations, data: locations } = useQuery({
    queryKey: ["Locations", trainerName, classId],
    queryFn: () => getLocationsByTrainerNameAndClass(trainerName, classId),
    enabled: !!trainerName && !!classId,
  });

  return { isLoadingLocations, locations };
}
