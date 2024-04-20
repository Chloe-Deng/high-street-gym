import { useAuth } from "../../contexts/AuthContext";
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
  } = item;
  console.log(item);

  return (
    <li className="flex gap-4 py-2">
      <div className="flex grow flex-col gap-0.5 pt-0.5">
        <h2 className="mb-1 font-[600] sm:mb-2">{className}</h2>
        {/* <div className="sm:wrap flex items-center justify-between sm:gap-6"> */}
        <p className="text-sm ">Trainer: {trainerName}</p>
        <p className="text-sm ">Location: {locationName}</p>

        {user.role !== "member" ? (
          <div className="mt-auto flex items-center justify-between">
            <p className="text-sm">User: {userName}</p>

            <DeleteItem bookingId={bookingId} />
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between">
            <p className="text-sm ">Time: {startTime}</p>
            <DeleteItem bookingId={bookingId} />
          </div>
        )}
      </div>
      {/* </div> */}
    </li>
  );
}

export default BookingItem;
