import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function ClassItem({ course }) {
  const {
    classId,
    activityName,
    startTime,
    activityDuration,
    // trainerNames,
    // locationNames,
  } = course;

  // console.log(course);

  return (
    <li className="flex gap-4 py-2">
      <div className="flex grow flex-col gap-0.5 pt-0.5">
        <p className="text-base font-semibold">{activityName}</p>
        <p className="text-sm capitalize italic text-stone-500">
          Time: {startTime}
        </p>
        {/* <p className="text-sm capitalize italic text-stone-500">
          Trainer: {trainerNames}
        </p> */}

        {/* <p className="text-sm capitalize italic text-stone-500">
          Location: {locationNames}
        </p> */}

        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm capitalize italic text-stone-600">
            Duration: {activityDuration} mins
          </p>

          <Link to={`${classId}`}>
            <Button variation="small">Book</Button>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default ClassItem;
