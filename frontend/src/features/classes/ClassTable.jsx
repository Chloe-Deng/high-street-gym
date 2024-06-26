import Loader from "../../ui/Loader";
import ClassItem from "./ClassItem";
import { useClasses } from "./useClasses";

function getDayOfWeek(date) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[new Date(date).getDay()];
}

function ClassTable() {
  const { isLoading, classes } = useClasses();

  const sortedClasses = classes
    ?.slice()
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const courses = sortedClasses?.reduce((acc, el) => {
    const date = new Date(el.startDate);
    const dateString = date.toLocaleDateString();
    const dayOfWeek = getDayOfWeek(date); // 获取星期几

    if (!acc[dateString]) {
      acc[dateString] = { dayOfWeek, classes: [] };
    }

    acc[dateString].classes.push(el);

    return acc;
  }, {});

  if (isLoading || !classes) return <Loader />;

  return (
    <div className="divide-y divide-stone-200 px-3 py-1 sm:px-2">
      {Object.entries(courses).map(([dateString, data]) => (
        <div className="pt-2" key={dateString}>
          <h2 className="bg-zinc-200 px-2 py-1 text-xl font-bold">
            {data.dayOfWeek} - {dateString}
          </h2>
          <ul className="py-2">
            {data.classes.map((course) => (
              <ClassItem course={course} key={course.classId} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ClassTable;
