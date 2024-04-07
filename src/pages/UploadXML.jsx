import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import xml2js from "xml2js";
import toast from "react-hot-toast";
import { createClass } from "../services/apiClasses";

function UploadXML() {
  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();

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
            name: classData.className[0],
            duration: classData.duration[0],
            description: classData.description[0],
            date: classData.datetime[0],
            startTime: classData.startAt[0],
            trainerID: classData.trainerID[0],
          }),
        );

        // 现在，classes 数组包含了从 XML 文件中提取的课程信息
        // console.log(classes);
        // console.log(classes[0]);

        mutate(classes[0]);
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
        <Button type="primary" disabled={isCreating}>
          Upload
        </Button>
      </div>
    </form>
  );
}

// font-size: 1.4rem;
//   border-radius: var(--border-radius-sm);

//   &::file-selector-button {
//     font: inherit;
//     font-weight: 500;
//     padding: 0.8rem 1.2rem;
//     margin-right: 1.2rem;
//     border-radius: var(--border-radius-sm);
//     border: none;
//     color: var(--color-brand-50);
//     background-color: var(--color-brand-600);
//     cursor: pointer;
//     transition: color 0.2s, background-color 0.2s;

//     &:hover {
//       background-color: var(--color-brand-700);
//     }

export default UploadXML;