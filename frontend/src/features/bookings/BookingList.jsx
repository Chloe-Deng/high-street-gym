import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../ui/Loader";
import BookingItem from "./BookingItem";
import EmptyBooking from "./EmptyBooking";
import { useBookings } from "./useBookings";
// import { useMemberBookings } from "./useMemberBookings";

// function BookingList() {
//   const { user } = useAuth();
//   console.log(user, user.firstName);

//   const { isMemberLoading, memberBookings } = useMemberBookings();
//   console.log(memberBookings);

//   const { isLoading, bookings = [] } = useBookings();
//   console.log(bookings);
//   // const { userName } = bookings?.[0];
//   // const userFirstName = userName.split(" ")[0];

//   let userFirstName;
//   if (bookings && bookings.length > 0 && bookings[0].userName) {
//     userFirstName = bookings[0].userName.split(" ")[0];

//     console.log(userFirstName);
//   }

//   const isMember = user.firstName === userFirstName;

//   if (isLoading || !bookings) return <Loader />;
//   if (!bookings.length) return <EmptyBooking />;

//   return (
//     <div className="px-4 py-3">
//       {isMember ? (
//         <h2 className="mt-7 text-xl font-semibold">
//           Your bookings, {userFirstName}
//         </h2>
//       ) : (
//         <h1 className="mt-7 text-xl font-semibold">Bookings</h1>
//       )}

//       <ul className="mt-3 divide-y divide-zinc-200 border-b">
//         {bookings.map((item) => (
//           <BookingItem item={item} key={item.bookingId} />
//         ))}
//       </ul>
//     </div>
//   );
// }

function BookingList() {
  const { user } = useAuth();
  // console.log(user?.firstName);

  const { isLoading, bookings } = useBookings();
  // console.log(bookings);

  // 判断用户是否为admin或trainer
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
