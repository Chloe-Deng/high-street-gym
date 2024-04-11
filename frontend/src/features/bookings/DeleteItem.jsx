import Button from "../../ui/Button";
import { useDeleteBooking } from "./useDeleteBooking";

function DeleteItem({ bookingId }) {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  return (
    <Button
      variation="small"
      onClick={() => deleteBooking(bookingId)}
      disabled={isDeleting}
    >
      Cancel
    </Button>
  );
}

export default DeleteItem;
