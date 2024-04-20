import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import xml2js from "xml2js";
import toast from "react-hot-toast";
import { createClass } from "../services/apiClasses";
import getStoredAuthKey from "../utils/getStoredAuthKey";
import { useCreateUser } from "../features/account/useCreateUser";
import useCreateClass from "../features/classes/useCreateClass";

function UploadXML() {
  const { register, handleSubmit } = useForm();

  // const queryClient = useQueryClient();

  const authenticationKey = getStoredAuthKey();

  // const { mutate, isLoading: isCreating } = useMutation({
  //   mutationFn: createClass,
  //   onSuccess: () => {
  //     toast.success("New class successfully created");
  //     queryClient.invalidateQueries({ queryKey: ["classes"] });
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const { createUser } = useCreateUser();
  const { createClass, isCreating } = useCreateClass();

  function onSubmit(data) {
    const file = data.xml[0];
    // console.log(file);
    const reader = new FileReader();

    reader.onload = async function (event) {
      const xmlString = event.target.result; // 获取读取的文件内容

      // 使用 xml2js 解析 XML 字符串为 JavaScript 对象
      //     const parser = new xml2js.Parser();

      //     parser.parseString(xmlString, function (err, result) {
      //       if (err) {
      //         console.error("Error parsing XML:", err);
      //         return;
      //       }

      //       // 提取解析后的 JavaScript 对象
      //       // const classes = result["class-upload"].classes[0].class.map(
      //       //   (classData) => ({
      //       //     activityName: classData.activityName[0],
      //       //     startDate: classData.startDate[0],
      //       //     startTime: classData.startTime[0],
      //       //     locationName: classData.locationName[0],
      //       //     trainerName: classData.trainerName[0],
      //       //     activityDuration: parseInt(classData.activityDuration[0], 10), // 将字符串转换为整数
      //       //     activityDescription: classData.activityDescription[0],
      //       //   }),
      //       // );

      //       // mutate({ newClass: classes[0], authenticationKey });

      //       // Check if it's class upload or user upload
      //       if (result["class-upload"]) {
      //         // Logic for class upload
      //         const classes = result["class-upload"].classes[0].class.map(
      //           (classData) => ({
      //             activityName: classData.activityName[0],
      //             startDate: classData.startDate[0],
      //             startTime: classData.startTime[0],
      //             locationName: classData.locationName[0],
      //             trainerName: classData.trainerName[0],
      //             activityDuration: parseInt(classData.activityDuration[0], 10),
      //             activityDescription: classData.activityDescription[0],
      //           }),
      //         );

      //         // Assuming you want to create all classes found in the XML
      //         classes.forEach((classEntity) => {
      //           mutate({ newClass: classEntity, authenticationKey });
      //         });
      //       } else if (result["user-upload"]) {
      //         // console.log(result["user-upload"]);
      //         // Logic for user upload
      //         const users = result["user-upload"].users[0].user.map((userData) => ({
      //           email: userData.email[0],
      //           password: userData.password[0],
      //           role: userData.role[0],
      //           firstName: userData.firstName[0],
      //           lastName: userData.lastName[0],
      //         }));

      //         console.log(users);

      //         //  Create user found in the XML
      //         users.forEach((userEntity) => {
      //           createUser({ user: userEntity, authenticationKey });
      //         });
      //       }
      //     });
      //   };

      //   reader.readAsText(file);
      // }
      const parser = new xml2js.Parser({ explicitArray: false });

      try {
        const result = await parser.parseStringPromise(xmlString);

        // Handling class uploads
        if (result["class-upload"]) {
          console.log(result["class-upload"]);
          const classDataArray = [].concat(
            result["class-upload"].classes.class,
          ); // Ensure it's always an array
          const classes = classDataArray.map((classData) => ({
            activityName: classData.activityName,
            startDate: classData.startDate,
            startTime: classData.startTime,
            locationNames: [].concat(classData.locationNames.locationName), // Ensure it's always an array
            trainerNames: [].concat(classData.trainerNames.trainerName), // Ensure it's always an array
            activityDuration: parseInt(classData.activityDuration, 10),
            activityDescription: classData.activityDescription,
          }));

          console.log(classes);

          // Now, mutate can be called for each class
          classes.forEach((classEntity) => {
            createClass({ newClass: classEntity, authenticationKey });
          });
        }

        // Handling user uploads
        if (result["user-upload"]) {
          const userDataArray = [].concat(result["user-upload"].users.user); // Ensure it's always an array
          const users = userDataArray.map((userData) => ({
            email: userData.email,
            password: userData.password,
            role: userData.role,
            firstName: userData.firstName,
            lastName: userData.lastName,
          }));

          console.log(users);

          // Now, create each user
          users.forEach((userEntity) => {
            createUser({ user: userEntity, authenticationKey });
          });
        }
      } catch (err) {
        console.error("Error parsing XML:", err);
      }
    };

    reader.readAsText(file);
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-10"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div>
        <h1 className="py-8 text-center text-xl font-semibold">Upload Files</h1>
        <input
          className="custom-file-selector"
          type="file"
          name="xml"
          id="xml"
          {...register("xml")}
        />
      </div>
      <div>
        <Button variation="primary" disabled={isCreating}>
          Upload
        </Button>
      </div>
    </form>
  );
}

export default UploadXML;
