export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-slate-200 bg-opacity-50 backdrop-blur flex justify-center items-center">
    <div className="relative inline-flex">
        <div className="w-8 h-8 bg-primary rounded-full"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
    </div>
  )
}
