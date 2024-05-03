import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../ui/Loader";
import BookingItem from "./BookingItem";
import EmptyBooking from "./EmptyBooking";
import { useBookings } from "./useBookings";
// import { useMemberBookings } from "./useMemberBookings";

function BookingList() {
  const { user } = useAuth();
  // console.log(user?.firstName);

  const { isLoading, bookings } = useBookings();
  // console.log(bookings);

  const isAdminOrTrainer = user?.role === "admin" || user?.role === "trainer";

  if (isLoading || !bookings) return <Loader />;
  if (!isAdminOrTrainer && !bookings.length) return <EmptyBooking />;

  return (
    <div className="px-4 py-3">
      {isAdminOrTrainer ? (
        <h1 className="mt-7 text-2xl font-semibold">All Bookings</h1>
      ) : (
        <h1 className="mt-7 text-2xl font-semibold">
          Your Bookings, {user.firstName}
        </h1>
      )}
      <ul className="mt-3 divide-y divide-zinc-200 border-b">
        {bookings.map((item) => (
          <BookingItem item={item} key={item.bookingId} />
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
