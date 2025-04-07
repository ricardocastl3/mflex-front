import LogoSpinner from "./spinner/LogoSpinner";

export default function LoadingLayout() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-ausoft-slate-950 fixed inset-0">
      <LogoSpinner />
    </div>
  );
}
