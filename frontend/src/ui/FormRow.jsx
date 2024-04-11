import Error from "./Error";

function FormRow({ label, error, children }) {
  return (
    <div className="flex flex-col gap-0.5">
      {/* label 的名字和 input 的 id 是一样的 */}
      {label && (
        <label className="text-base font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}

      {children}

      {error && <Error>{error}</Error>}
    </div>
  );
}

export default FormRow;
