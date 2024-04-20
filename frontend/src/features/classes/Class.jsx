import LinkButton from "../../ui/LinkButton";
import { useParams } from "react-router-dom";

// import { useClass } from "./useClass";
import Loader from "../../ui/Loader";
// import { useQuery } from "@tanstack/react-query";
// import { getClass } from "../../services/apiClasses";
import Button from "../../ui/Button";
import { useClass } from "./useClass";
import FormRow from "../../ui/FormRow";
import { useAuth } from "../../contexts/AuthContext";
import { useCreateBooking } from "../bookings/useCreateBooking";
import { useForm } from "react-hook-form";
import { useMoveBack } from "../../hooks/useMoveBack";

function Class() {
  const { id } = useParams();
  // console.log(id);

  const { user } = useAuth();
  const { firstName, lastName } = user;

  const { isCreating, createBooking } = useCreateBooking();
  const { register, handleSubmit, formState } = useForm();

  // const { errors } = formState;

  function onSubmit(data) {
    // console.log(postData);
    createBooking(data, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  }

  const moveBack = useMoveBack();
  const handleClick = (e) => {
    e.preventDefault();
    moveBack();
  };

  const { classData, isLoading } = useClass(id);

  if (isLoading || !classData) return <Loader />;

  const { activityName, startDate, startTime, locationNames, trainerNames } =
    classData;

  const locationOptions = locationNames.split(", ");
  const trainerOptions = trainerNames.split(", ");

  const date = new Date(startDate);

  // Add one day
  date.setUTCDate(date.getUTCDate() + 1);

  // Extract the UTC date parts
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1
  const dd = String(date.getUTCDate()).padStart(2, "0");

  // Format is 'YYYY-MM-DD'
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  // console.log(formattedDate);

  return (
    <div className="mt-5">
      <LinkButton to="/classes">&larr; Back to classes</LinkButton>

      <div className="mt-10 flex flex-col items-center gap-5 text-center">
        <h1 className="text-2xl font-semibold text-zinc-800">Create Booking</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <input
              className="border-none bg-zinc-100 py-2 text-center text-xl font-bold text-amber-600 focus:outline-none"
              type="text"
              name="activityName"
              readOnly
              defaultValue={activityName}
              required
              {...register("activityName")}
            />
          </FormRow>

          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center focus:outline-none"
              type="text"
              name="userName"
              readOnly
              defaultValue={`${firstName} ${lastName}`}
              required
              hidden
              {...register("userName")}
            />
          </FormRow>

          <FormRow>
            <input
              className="border-none bg-zinc-100 text-center font-[400] focus:outline-none"
              type="text"
              name="startDate"
              readOnly
              defaultValue={formattedDate}
              required
              {...register("startDate")}
            />
          </FormRow>

          <FormRow>
            <input
              className="border-none bg-zinc-100 pb-4 pt-2 text-center font-[400] focus:outline-none"
              type="text"
              name="startTime"
              defaultValue={startTime}
              required
              readOnly
              {...register("startTime")}
            />
          </FormRow>

          <FormRow>
            <select
              className="w-full rounded-md border border-zinc-200 px-2.5 py-3 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
              name="trainerName"
              required
              {...register("trainerName")}
            >
              <option value="" disabled selected>
                Available trainers
              </option>{" "}
              {/* This is your placeholder option */}
              {trainerOptions.map((trainer, index) => (
                <option key={index} value={trainer}>
                  {trainer}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow>
            <select
              className="w-full rounded-md border border-zinc-200 p-2.5 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
              name="locationName"
              required
              {...register("locationName")}
            >
              <option value="" disabled selected>
                Available locations
              </option>{" "}
              {/* This is your placeholder option */}
              {locationOptions.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </FormRow>

          <div className="mt-4 flex justify-center gap-1">
            <Button variation="primary">Book</Button>
            <Button variation="secondary" onClick={handleClick}>
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Class;
