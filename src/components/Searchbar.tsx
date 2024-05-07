import { Link } from 'react-router-dom'
import sampleProfileImg from "../assets/avatar.webp";

export default function Searchbar() {
  return (
    <div className="flex justify-start items-center gap-4 lg:gap-10">
    <input
      type="text"
      placeholder="Search Courses"
      className="bg-slate-50 border border-slate-600 focus:outline-none focus:border-slate-950 rounded-md p-0.5 pl-1.5 text-slate-950 sm:min-w-[300px]"
    />
    <Link to={"/profile"}>
      <img
        src={sampleProfileImg}
        alt="Sample Profile Avatar"
        className="w-[30px] h-[30px] rounded-full"
      />
    </Link>
  </div>
  )
}
