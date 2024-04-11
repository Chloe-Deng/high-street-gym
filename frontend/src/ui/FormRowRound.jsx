import Error from "./Error";

function FormRowRound({ label, error, children }) {
  return (
    <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
      {/* label 的名字和 input 的 id 是一样的 */}
      {label && (
        <label className="font-medium sm:basis-40" htmlFor={children.props.id}>
          {label}
        </label>
      )}

      {children}

      {error && <Error>{error}</Error>}
    </div>
  );
}

export default FormRowRound;
