import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useClass } from "./useClass";
import { useAuth } from "../../contexts/AuthContext";
import { useCreateBooking } from "../bookings/useCreateBooking";
import { useLocations } from "./useLocations";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatUtcDateWithOffset } from "../../utils/helpers";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import FormRow from "../../ui/FormRow";
import { useMemo } from "react";

function Class() {
  const { id } = useParams();
  const { user } = useAuth();
  const { firstName, lastName } = user;
  const { isCreating, createBooking } = useCreateBooking();

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      trainerName: "",
    },
  });

  const selectedTrainer = watch("trainerName");
  const selectedLocation = watch("locationName");

  // const { isLocationsLoading, locations } =
  //   useLocationsByTrainer(selectedTrainer);
  const { isLoadingLocations, locations } = useLocations(selectedTrainer, id);

  function onSubmit(data) {
    // console.log(postData);
    createBooking(data, {
      onSuccess: (data) => {
        // console.log(data);
      },
    });
  }

  const moveBack = useMoveBack();
  const handleClick = (e) => {
    e.preventDefault();
    moveBack();
  };

  const { classData, isLoading } = useClass(id);

  const trainerLocations = useMemo(() => {
    if (!classData || !classData?.trainerNames || !locations?.length) return [];
    const trainerOptions = classData.trainerNames.split(", ");
    const trainerIndex = trainerOptions.findIndex((t) => t === selectedTrainer);
    if (locations[trainerIndex]) return [locations[trainerIndex]];
    return [locations[0]];
  }, [selectedTrainer, classData, locations]);

  if (isLoading || !classData) return <Loader />;

  const { activityName, startDate, startTime, trainerNames } = classData;
  // const locationOptions = locationNames.split(", ");
  const trainerOptions = trainerNames.split(", ");

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
              defaultValue={formatUtcDateWithOffset(startDate)}
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
            <Controller
              control={control}
              name="trainerName"
              render={({ field }) => (
                <select
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-3 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
                  disabled={!!selectedLocation}
                  {...field}
                >
                  <option value="" disabled>
                    Available trainers
                  </option>
                  {trainerOptions?.map((trainer, index) => (
                    <option key={index} value={trainer}>
                      {trainer}
                    </option>
                  ))}
                </select>
              )}
            />
          </FormRow>

          <FormRow>
            <select
              className="w-full rounded-md border border-zinc-200 p-2.5 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
              name="locationName"
              required
              defaultValue=""
              {...register("locationName")}
            >
              <option value="" disabled>
                Available locations
              </option>
              {isLoadingLocations ? (
                <option>Loading locations...</option>
              ) : (
                trainerLocations?.map((location) => (
                  <option key={location.id} value={location.location_name}>
                    {location.location_name}
                  </option>
                ))
              )}
            </select>
          </FormRow>

          {/* <FormRow>
            <select
              className="w-full rounded-md border border-zinc-200 px-2.5 py-3 text-base transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-amber-400"
              name="trainerName"
              required
              defaultValue=""
              {...register("trainerName")}
            >
              <option value="" disabled>
                Available trainers
              </option>
              
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
              defaultValue=""
              {...register("locationName")}
            >
              <option value="" disabled>
                Available locations
              </option>
            
              {locationOptions.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </FormRow> */}

          <div className="mb-5 mt-4 flex justify-center gap-1">
            <Button variation="primary" disabled={isCreating}>
              Book
            </Button>
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
