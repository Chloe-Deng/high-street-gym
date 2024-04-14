// import input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import getStoredAuthKey from "../../utils/getStoredAuthKey";

function UpdateAccountForm({ userToUpdate = {}, onCloseModal }) {
  const { id: editId, ...editValues } = userToUpdate;

  // 将id转换成布尔值来判断是否为编辑状态，如果editId存在，那么为true，反之亦然
  const isEditSession = Boolean(editId);

  // 将defaultValues对象传入useForm中，用于设置当渲染时表单的默认值
  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isUpdating, updateUser } = useUpdateUser();

  const { errors } = formState;
  // console.log(errors);

  // const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const authenticationKey = getStoredAuthKey();
    // console.log(editId);

    if (isEditSession)
      updateUser(
        { user: { ...data, id: editId }, authenticationKey }, // 包含所有更新的字段和用户ID

        // {
        //   onSuccess: (data) => {
        //     onCloseModal?.();
        //   },
        // },
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="First name" error={errors?.firstName?.message}>
        <input
          className="input-square"
          type="text"
          id="firstName"
          disabled={isUpdating}
          {...register("firstName")}
        />
      </FormRow>

      <FormRow label="Last name" error={errors?.lastName?.message}>
        <input
          className="input-square"
          type="text"
          id="lastName"
          disabled={isUpdating}
          {...register("lastName")}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <input
          className="input-square"
          type="email"
          id="email"
          disabled={isUpdating}
          {...register("email")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <div className="flex justify-end gap-1">
          <Button variation="primary" disabled={isUpdating}>
            Update
          </Button>
          <Button
            // onClick={() => onCloseModal?.()}
            variation="secondary"
            type="reset"
          >
            Cancel
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default UpdateAccountForm;
