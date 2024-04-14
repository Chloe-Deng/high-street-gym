import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../ui/Loader";
import BookingItem from "./BookingItem";
import EmptyBooking from "./EmptyBooking";
import { useBookings } from "./useBookings";

function BookingList() {
  const { user } = useAuth();

  const { isLoading, bookings } = useBookings();
  console.log(bookings);

  if (isLoading || !bookings) return <Loader />;
  if (!bookings.length) return <EmptyBooking />;

  return (
    <div className="px-4 py-3">
      <h2 className="mt-7 text-xl font-semibold">
        Your bookings, {user.firstName}
      </h2>

      <ul className="mt-3 divide-y divide-zinc-200 border-b">
        {bookings.map((item) => (
          <BookingItem item={item} key={item.bookingId} />
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
