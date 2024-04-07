import Loader from "../../ui/Loader";
import ClassItem from "./ClassItem";
import { useClasses } from "./useClasses";

function ClassTable() {
  const { isLoading, classes } = useClasses();

  // Since fetch the data from the data base is an async process, so we need to check if the data is already arrived or not
  const sortedClasses = classes
    ?.slice()
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  const groupedClasses = {};

  const courses = sortedClasses?.reduce((acc, el) => {
    const date = new Date(el.datetime).toLocaleDateString();

    // if (!acc[date]) {
    //   acc[date] = [];
    // }

    // acc[date].push(el);

    // 创建新的日期键，如果不存在的话
    if (!acc[date]) {
      acc = { ...acc, [date]: [] };
    }

    // 将课程添加到对应日期的课程列表中
    acc[date] = [...acc[date], el];

    return acc;
  }, groupedClasses);

  if (isLoading || !classes) return <Loader />;

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);
  // console.log(countries);

  return (
    <div className="divide-y divide-stone-200 px-2 py-1">
      {Object.entries(courses).map(([date, classes]) => (
        <div className="pt-2" key={date}>
          <h2 className="bg-zinc-200 px-2 py-1 text-xl font-bold" key={date}>
            {date}
          </h2>

          <ul className="py-2">
            {classes.map((course) => (
              <ClassItem course={course} key={course.id} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ClassTable;
