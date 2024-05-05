import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModal } from "../../store/slices/modalSlice";
import { RootState } from "../../store/store";
import Button from "../Button";

interface AuthModalProps {}

const AuthModal: FC<AuthModalProps> = ({}) => {
  const { currentModal } = useSelector((state: RootState) => state.modals);
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
            className="h-auto w-auto px-2 text-slate-600 py-2 min-w-[unset]"
            onClick={closeModalFunc}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </Button>
        </div>
        <div className="p-4 md:p-5">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
