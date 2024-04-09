import DeleteItem from "./DeleteItem";

function BookingItem({ item }) {
  const { bookingId, className, bookingTime, locationName } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">{className}</p>
      <div className="sm:wrap flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{bookingTime}</p>
        <p className="text-sm font-bold">{locationName}</p>

        <DeleteItem bookingId={bookingId} />
      </div>
    </li>
  );
}

export default BookingItem;
