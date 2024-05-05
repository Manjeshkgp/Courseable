import { Link } from "react-router-dom";
import mainLogo from '../assets/main_logo.png'

export default function Logo() {
  return (
    <Link to={"/"} className="flex justify-start items-end gap-0 text-primary">
      <img src={mainLogo} alt="Courseable Logo" className="w-6 h-6 md:w-10 md:h-10" />
      <p className="-ml-1.5 -mb-0.5 text-lg leading-6 md:text-3xl md:-ml-2.5">ourseable</p>
    </Link>
  );
}
