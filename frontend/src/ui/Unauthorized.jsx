import LinkButton from "./LinkButton";

function Unauthorized() {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-2xl font-bold">Unauthorized</h2>
      <p className="m-5">You do not have permission to access this page 😢</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}
export default Unauthorized;
