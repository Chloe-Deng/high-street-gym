import LinkButton from "../ui/LinkButton";

function PageNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-xl font-bold">PAGE NOT FOUND 😢</h1>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default PageNotFound;
