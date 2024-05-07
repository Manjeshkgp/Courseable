import { useDispatch, useSelector } from "react-redux";
import ModalManager from "./ModalManager";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { updateLoading } from "../store/slices/modalSlice";
import { login } from "../store/slices/userSlice";

const Layout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            id: user.uid,
            email: user.email,
            isAuthenticated: true,
            myCourses: [],
          })
        );

        dispatch(updateLoading(false));
      } else {
        dispatch(updateLoading(false));
      }
    });
  }, []);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <Outlet />
      <ModalManager />
    </>
  );
};

export default Layout;
