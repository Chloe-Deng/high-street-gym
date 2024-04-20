import Button from "../ui/Button";
import PageNav from "../ui/PageNav";

function HomePage() {
  return (
    <main className="bg-image-with-gradient m-5 h-screen  px-4 py-2">
      <PageNav />

      <section className="item-center flex h-[85%] flex-col justify-center gap-4 text-center">
        <h1 className="text-[1.4rem] font-semibold text-zinc-50 sm:text-[1.6rem] sm:font-bold">
          You could be powerful.
          <br />
        </h1>
        <h2 className="text-[1.2rem] font-medium text-amber-400 sm:text-[1.4rem] sm:font-semibold">
          High Street Gym keeps boost of your body.
        </h2>
        <h2 className="mb-4 px-4 text-[1.1rem] text-zinc-50 sm:text-[1.2rem]">
          Elevate your fitness in a space where each workout turns potential
          into progress. Join us on the path to peak power.
          <br />
          Ready, set, thrive!
        </h2>
        <div>
          <Button to="/classes" variation="primary">
            Start booking
          </Button>
          {/* <button onClick={logout}>logout</button> */}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
