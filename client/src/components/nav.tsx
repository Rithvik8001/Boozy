export default function Nav() {
  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-red-100 p-3">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" width={50} height={30} />
          <h1 className="text-2xl font-medium tracking-tighter">Boozy</h1>
        </div>
      </div>
    </>
  );
}
