import { useQuery } from "@tanstack/react-query";
import { getLocationsByTrainerName } from "../../services/apiClasses";

export function useLocationsByTrainer(trainerName) {
  const { isLoading: isLocationsLoading, data: locations } = useQuery({
    queryKey: ["Locations", trainerName],
    queryFn: () => getLocationsByTrainerName(trainerName),
    enabled: !!trainerName,
  });
  // console.log(locations);

  return { isLocationsLoading, locations };
}
