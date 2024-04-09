import LinkButton from "../../ui/LinkButton";

function EmptyBooking() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/classes">&larr; Back to class lists</LinkButton>

      <p className="mt-7 font-semibold">
        Your booking list is still empty. Start adding some classes :)
      </p>
    </div>
  );
}

export default EmptyBooking;
