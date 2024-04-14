import BookingList from "../features/bookings/BookingList";
import LinkButton from "../ui/LinkButton";

function Bookings() {
  return (
    <>
      <div className="mt-5">
        <LinkButton to="/classes">&larr; Back to classes</LinkButton>
      </div>
      <BookingList />
    </>
  );
}

export default Bookings;
