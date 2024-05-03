import { useAuth } from "../../contexts/AuthContext";
import { formatUtcDateWithOffset } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";

function BookingItem({ item }) {
  const { user } = useAuth();
  const {
    bookingId,
    className,
    trainerName,
    locationName,
    userName,
    startTime,
    startDate,
  } = item;

  return (
    <li className="flex gap-4 py-2">
      <div className="gap-0.8 flex grow flex-col pt-0.5">
        <h2 className="mb-1 font-[600] sm:mb-2">{className}</h2>
        {/* <div className="sm:wrap flex items-center justify-between sm:gap-6"> */}
        <p className="text-sm italic text-stone-500">Trainer: {trainerName}</p>
        <p className="text-sm italic text-stone-500">
          Location: {locationName}
        </p>
        <p className="text-sm italic text-stone-500">
          Date: {formatUtcDateWithOffset(startDate)}
        </p>

        {user.role !== "member" ? (
          <div className="mt-auto flex items-center justify-between">
            <p className="text-sm italic text-stone-500">User: {userName}</p>

            <DeleteItem bookingId={bookingId} />
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between">
            <p className="text-sm italic text-stone-500">Time: {startTime}</p>
            <DeleteItem bookingId={bookingId} />
          </div>
        )}
      </div>
      {/* </div> */}
    </li>
  );
}

export default BookingItem;
