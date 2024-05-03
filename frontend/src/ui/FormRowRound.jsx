import Error from "./Error";

function FormRowRound({ label, error, children }) {
  return (
    <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
      
      {label && (
        <label className="font-medium sm:basis-40" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      <div className="flex flex-grow flex-col">
        {children}

        {error && <Error>{error}</Error>}
      </div>
    </div>
  );
}

export default FormRowRound;
