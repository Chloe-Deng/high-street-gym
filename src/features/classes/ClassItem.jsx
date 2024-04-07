import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function ClassItem({ course }) {
  const { id, className, startAt, duration, trainerName } = course;

  return (
    <li className="flex gap-4 py-2">
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{className}</p>
        <p className="text-sm capitalize italic text-stone-500">
          Duration: {duration}
        </p>
        <p className="text-sm capitalize italic text-stone-500">
          Start at: {startAt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm">Trainer: {trainerName}</p>

          <Link to={`${id}`}>
            <Button type="small">Book</Button>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default ClassItem;
