import LinkButton from "../../ui/LinkButton";
import { useParams } from "react-router-dom";

// import { useClass } from "./useClass";
import Loader from "../../ui/Loader";
import { useQuery } from "@tanstack/react-query";
// import { getClass } from "../../services/apiClasses";
import Button from "../../ui/Button";
import { useClass } from "./useClass";
import FormRow from "../../ui/FormRow";
import { useAuth } from "../../contexts/AuthContext";
import { useCreateBooking } from "../bookings/useCreateBooking";
import { useForm } from "react-hook-form";

function Class() {
  const { id } = useParams();
  console.log(id);

  const { user } = useAuth();
  const { firstName, lastName } = user;

  const { isCreating, createBooking } = useCreateBooking();
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    // console.log(postData);
    createBooking(data, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  }

  const { classData, isLoading } = useClass(id);

  if (isLoading || !classData) return <Loader />;

  const { activityName, startDate, startTime, locationName, trainerName } =
    classData;

  const date = new Date(startDate);

  // Add one day
  date.setUTCDate(date.getUTCDate() + 1);

  // Extract the UTC date parts
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1
  const dd = String(date.getUTCDate()).padStart(2, "0");

  // 格式化为 'YYYY-MM-DD'
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  // console.log(formattedDate);

  return (
    <div className="mt-5">
      <LinkButton to="/classes">&larr; Back to classes</LinkButton>

      <div className="mt-10 flex flex-col text-center">
        <h1>Create Booking</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center"
              type="text"
              name="activityName"
              defaultValue={activityName}
              required
              {...register("activityName")}
            />
          </FormRow>
          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center"
              type="text"
              name="userName"
              defaultValue={`${firstName} ${lastName}`}
              required
              {...register("userName")}
            />
          </FormRow>
          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center"
              type="text"
              name="trainerName"
              defaultValue={trainerName}
              required
              {...register("trainerName")}
            />
          </FormRow>
          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center"
              type="text"
              name="locationName"
              defaultValue={locationName}
              required
              {...register("locationName")}
            />
          </FormRow>
          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center"
              type="text"
              name="startTime"
              defaultValue={startTime}
              required
              {...register("startTime")}
            />
          </FormRow>

          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center"
              type="text"
              name="startDate"
              defaultValue={formattedDate}
              required
              {...register("startDate")}
            />
          </FormRow>

          <Button variation="primary">Book</Button>
        </form>
      </div>
    </div>
  );
}

export default Class;
