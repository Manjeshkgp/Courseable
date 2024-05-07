import { useState } from "react";
import { cn } from "../lib/utils";
import Button from "./Button";
import { Link } from "react-router-dom";
import Close from "./svgs/Close";
import Home from "./svgs/Home";
import Courses from "./svgs/Courses";
import Searchbar from "./Searchbar";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const logoutFunc = async() => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log({error});
    }
  }
  return (
    <>
      <nav className="w-full fixed left-0 z-20">
        <div
          className={cn(
            "flex flex-col transition-all duration-300 translate-x-[90vw] xs:translate-x-[320px] bg-white absolute right-0 lg:right-auto lg:left-0 lg:-translate-x-[320px] border-l lg:border-l-0 lg:border-r border-slate-400 h-screen overflow-y-auto w-[90vw] max-w-[320px] z-20",
            open && "translate-x-0 xs:translate-x-0 lg:translate-x-0"
          )}
        >
          <Button
            className="h-auto w-auto px-2 text-slate-50 py-2 min-w-[unset] absolute right-2 top-2 md:right-3 md:top-3"
            onClick={toggleOpen}
          >
            <Close />
          </Button>
          <div className="flex flex-col justify-start items-start mt-14 gap-2 pl-5 text-2xl text-slate-200">
            <Link
              className="flex justify-start items-center gap-1 bg-primary p-1 rounded-md w-[calc(100%-40px)] hover:text-slate-50 hover:bg-opacity-90"
              to={"/"}
            >
              <Home />
              <p>Home</p>
            </Link>
            <Link
              className="flex justify-start items-center gap-1 bg-primary p-1 rounded-md w-[calc(100%-40px)] hover:text-slate-50 hover:bg-opacity-90"
              to={"/courses"}
            >
              <Courses />
              <p>Courses</p>
            </Link>
            <Button
            onClick={logoutFunc}
            className="h-auto w-auto px-2 text-slate-50 py-2 min-w-[unset] absolute bottom-3 right-3 md:left-3 md:right-auto"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
      {/* Search Bar */}
      <div className="flex justify-between items-center p-3 md:p-5 border-b border-slate-400 bg-slate-50 text-slate-950 relative">
        <div
          onClick={toggleOpen}
          className="flex flex-col gap-[3px] md:gap-1 justify-start items-center cursor-pointer absolute md:static right-3"
        >
          <div className="bg-primary w-6 h-0.5 md:h-1 md:w-8 rounded-full" />
          <div className="bg-primary w-6 h-0.5 md:h-1 md:w-8 rounded-full" />
          <div className="bg-primary w-6 h-0.5 md:h-1 md:w-8 rounded-full" />
        </div>
        <Searchbar/>
      </div>
    </>
  );
};

export default Navbar;
