import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import xml2js from "xml2js";
import toast from "react-hot-toast";
import { createClass } from "../services/apiClasses";
import { getStoredAuthKey } from "../utils/getStoredAuthKey";

function UploadXML() {
  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();

  const authenticationKey = getStoredAuthKey();
  console.log(authenticationKey);

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      toast.success("New class successfully created");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const file = data.xml[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const xmlString = event.target.result; // 获取读取的文件内容

      // 使用 xml2js 解析 XML 字符串为 JavaScript 对象
      const parser = new xml2js.Parser();
      parser.parseString(xmlString, function (err, result) {
        if (err) {
          console.error("Error parsing XML:", err);
          return;
        }

        // 提取解析后的 JavaScript 对象
        const classes = result["class-upload"].classes[0].class.map(
          (classData) => ({
            activityName: classData.activityName[0],
            startDate: classData.startDate[0],
            startTime: classData.startTime[0],
            locationName: classData.locationName[0],
            trainerName: classData.trainerName[0],
            activityDuration: parseInt(classData.activityDuration[0], 10), // 将字符串转换为整数
            activityDescription: classData.activityDescription[0],
          }),
        );

        // 现在，classes 数组包含了从 XML 文件中提取的课程信息
        // console.log(classes);
        // console.log(classes[0]);

        mutate({ newClass: classes[0], authenticationKey });
      });
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
        <h1 className="text-l py-5 text-center font-semibold">Upload Files</h1>
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
