function Form({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-4 rounded-lg p-4 sm:p-8"
    >
      {children}
    </form>
  );
}

export default Form;
