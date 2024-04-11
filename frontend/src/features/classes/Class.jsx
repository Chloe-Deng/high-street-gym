import LinkButton from "../../ui/LinkButton";
import { useParams } from "react-router-dom";

// import { useClass } from "./useClass";
import Loader from "../../ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { getClass } from "../../services/apiClasses";
import Button from "../../ui/Button";

function Class() {
  const { id } = useParams();

  // useEffect(
  //   function () {
  //     getClass(id).then((data) => console.log(data));
  //   },
  //   [id],
  // );

  const { isLoading, data: classData } = useQuery({
    queryKey: ["class", id], // 提供一个包含 id 的 queryKey
    queryFn: () => getClass(id), // 使用箭头函数确保正确调用 getClass，并传入 id
    enabled: !!id, // 只有当 id 存在时才执行查询
  });

  if (isLoading || !classData) return <Loader />;

  const { activityName, startDate, startTime } = classData;

  return (
    <div className="mt-5">
      <LinkButton to="/classes">&larr; Back to classes</LinkButton>

      <div className="mt-10 flex flex-col text-center">
        <h1>Create Booking</h1>
        <form action="">
          <h1 className="mt-5 text-xl font-semibold">{activityName}</h1>
          <p className="text-m mb-3 mt-5">{startDate}</p>
          <p className="text-m mb-3 mt-5">{startTime}</p>
          <Button variation="primary">Book</Button>
        </form>
      </div>
    </div>
  );
}

export default Class;
