// import { useEffect } from "react";
// import { getClasses } from "../services/apiClasses";
import ClassTable from "../features/classes/ClassTable";

function Classes() {
  // useEffect(function () {
  //   getClasses().then((data) => console.log(data));
  // }, []);

  return (
    <>
      <ClassTable />
    </>
  );
}

export default Classes;
