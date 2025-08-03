import Hero from "./hero";

export default function Home() {
  return (
    <>
      <div className="m-2 flex flex-col">
        <div className="mx-auto w-full max-w-5xl">
          <Hero />
        </div>
      </div>
    </>
  );
}
