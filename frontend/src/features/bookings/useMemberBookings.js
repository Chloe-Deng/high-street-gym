import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { getMemberBookings } from "../../services/apiBookings";

// useBookings hook might look something like this:
export function useMemberBookings() {
  const { user, authenticationKey } = useAuth();

  // Fetch bookings for the logged-in user
  // Make sure the endpoint supports fetching bookings for a specific user ID
  const {
    data: memberBookings,
    isLoading: isMemberLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", user.id], // Use the user's ID as part of the query key
    queryFn: () => getMemberBookings(authenticationKey), // Replace with your actual API call function
  });

  return { isMemberLoading, memberBookings, error };
}
