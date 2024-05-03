import { useForm } from "react-hook-form";
import xml2js from "xml2js";

import getStoredAuthKey from "../utils/getStoredAuthKey";
import useCreateUser from "../features/account/useCreateUser";
import useCreateClass from "../features/classes/useCreateClass";
import Button from "../ui/Button";

function UploadXML() {
  const { register, handleSubmit } = useForm();

  const authenticationKey = getStoredAuthKey();

  const { createUser, isCreatingUser } = useCreateUser();
  const { createClass, isCreatingClass } = useCreateClass();

  const isCreating = isCreatingClass || isCreatingUser;

  function onSubmit(data) {
    const file = data.xml[0];
    // console.log(file);
    const reader = new FileReader();

    reader.onload = async function (event) {
      const xmlString = event.target.result;

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

          // console.log(classes);

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

          // console.log(users);

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
