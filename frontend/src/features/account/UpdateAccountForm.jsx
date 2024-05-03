// import input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import getStoredAuthKey from "../../utils/getStoredAuthKey";
import { useAuth } from "../../contexts/AuthContext";

function UpdateAccountForm({
  userToUpdate = {},
  accessRole = ["admin"],
  onCloseModal,
}) {
  const { id: editId, ...editValues } = userToUpdate;
  const isEditSession = Boolean(editId);
  const { user: currentUser } = useAuth();
  const userIsAuthorized = currentUser && accessRole.includes(currentUser.role);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isUpdating, updateUser } = useUpdateUser();

  const { errors } = formState;

  function onSubmit(data) {
    const {
      authenticationKey: currentUpdatedUserAuthKey,
      password,
      ...updateData
    } = data;
    const authenticationKey = getStoredAuthKey();

    if (isEditSession)
      updateUser(
        { user: { ...updateData, id: editId }, authenticationKey }, // 包含所有更新的字段和用户ID

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

      {userIsAuthorized ? (
        <FormRow label="Role" error={errors?.role?.message}>
          <input
            className="input-square"
            type="role"
            id="role"
            disabled={isUpdating}
            {...register("role")}
          />
        </FormRow>
      ) : (
        ""
      )}

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
