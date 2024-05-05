import { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { updateModal } from "../store/slices/modalSlice";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const dispatch = useDispatch();
  const openLoginModal = () => dispatch(updateModal({ currentModal: "login" }));
  return (
    <header className="sticky top-0 bg-slate-50 text-slate-950 flex justify-between items-center p-3 border-b border-slate-300 md:px-8 md:py-4">
      <Logo />
      <div className="flex justify-end items-center gap-3 md:gap-5 md:text-2xl">
        <Link to={"/courses"}>Courses</Link>
        <Button variant="secondary" onClick={openLoginModal}>
          Login
        </Button>{" "}
      </div>
    </header>
  );
};

export default Header;
