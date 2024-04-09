import BookingList from "../features/bookings/BookingList";
import LinkButton from "../ui/LinkButton";

function Bookings() {
  return (
    <>
      <LinkButton to="/classes">&larr; Back to classes</LinkButton>
      <BookingList />
    </>
  );
}

export default Bookings;
