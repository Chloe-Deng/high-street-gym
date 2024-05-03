import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../../services/apiBookings.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

export function useBookings() {
  const { authenticationKey, user } = useAuth();
  // console.log(user);

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", user.role],
    queryFn: () => fetchBookings(authenticationKey),
  });

  return { isLoading, bookings };
}

export default useBookings;
