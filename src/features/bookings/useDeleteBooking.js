import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

// Custom hook
export function useDeleteBooking() {
  // Call the queryClient and then call invalidate queries
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,

    // After mutating the data, we need to invalidate the cache, which means re-fetch the data from the database, then the UI will automatically update
    onSuccess: () => {
      toast.success("Booking successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    // This error handler get access to the error object in the mutation function (deleteCabin)
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
