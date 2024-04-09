import Button from "../../ui/Button";

function AccountItem() {
  return (
    <div className="px-2 py-4 sm:px-4 sm:py-6">
      <h1 className="px-4 text-xl font-bold sm:px-8 sm:text-2xl">
        Hello, Chloe
      </h1>
      <form className="flex w-full flex-col gap-4 rounded-lg p-4 sm:p-8">
        <div className="flex flex-col">
          {/* <label className="text-base" htmlFor="firstName">
            First name
          </label> */}
          <input
            className="input-square"
            type="text"
            name="firstName"
            placeholder="First name"
            required
          />
        </div>

        <div className="flex flex-col">
          <input
            className="input-square"
            type="text"
            name="lastName"
            placeholder="Last name"
            required
          />
        </div>

        <div className="flex flex-col">
          <input
            className="input-square"
            type="text"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          <Button type="primary">Update</Button>
          <Button type="secondary" to="/">
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountItem;
