import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AuthModal from "./modals/AuthModal";
import CourseModal from "./modals/CourseModal";

// @todo: Suspense and Lazy loading should be added here

export default function ModalManager() {
  const { currentModal } = useSelector((state: RootState) => state.modals);
  return currentModal === null ? null : (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-opacity-15 backdrop-blur-sm bg-slate-400"
    >
      {["login", "signup"].includes(currentModal) && <AuthModal />}
      {currentModal === "course" && <CourseModal />}
    </div>
  );
}
