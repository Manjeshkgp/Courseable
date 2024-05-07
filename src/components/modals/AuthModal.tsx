import { ChangeEventHandler, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  updateLoading,
  updateModal,
} from "../../store/slices/modalSlice";
import { RootState } from "../../store/store";
import Button from "../Button";
import Close from "../svgs/Close";
import { auth } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { login } from "../../store/slices/userSlice";

interface AuthModalProps {}

const AuthModal: FC<AuthModalProps> = ({}) => {
  const { currentModal } = useSelector((state: RootState) => state.modals);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const toggleAuthModalState = () => {
    dispatch(
      updateModal({
        currentModal: currentModal === "login" ? "signup" : "login",
      })
    );
  };
  const closeModalFunc = () => {
    document.documentElement.style.overflow = "auto";
    dispatch(closeModal());
  };
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (currentModal === "signup") {
      dispatch(updateLoading(true));
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        if (user) {
          dispatch(login({email:user.email,id:user.uid,myCourses:[]}))
        }
        dispatch(closeModal())
        dispatch(updateLoading(false));
      } catch (error) {
        console.log({ error });
        dispatch(updateLoading(false));
      }
    } else if (currentModal === "login") {
      dispatch(updateLoading(true));

      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        if (user) {
          dispatch(login({email:user.email,id:user.uid,myCourses:[]}))
        }
        dispatch(closeModal())
        dispatch(updateLoading(false));
      } catch (error) {
        console.log({ error });
        dispatch(updateLoading(false));
      }
    }
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-slate-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-slate-600">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {currentModal === "login"
              ? "Sign in to our platform"
              : "Join our platform"}
          </h3>
          <Button
            type="button"
            className="h-auto w-auto px-2 text-slate-300 py-2 min-w-[unset]"
            onClick={closeModalFunc}
          >
            <Close />
          </Button>
        </div>
        <div className="p-4 md:p-5">
          <form className="space-y-4" onSubmit={formSubmitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white"
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white"
                required
                value={formData.password}
                onChange={inputChangeHandler}
              />
            </div>
            <Button className="text-white p-3 h-auto" type="submit">
              {currentModal === "login" ? "Login" : "Create Account"}
            </Button>
            <div className="text-sm flex w-full justify-between font-medium text-slate-500 dark:text-slate-300">
              <p>
                {currentModal === "login"
                  ? "Not registered?"
                  : "Already a user?"}{" "}
              </p>
              <p
                onClick={toggleAuthModalState}
                className="text-primary cursor-pointer hover:underline dark:text-primary"
              >
                {currentModal === "login" ? "Create account" : "Login"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
