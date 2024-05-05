import Button from "../components/Button";
import mianLogo from "../assets/main_logo.png"
import { useDispatch } from "react-redux";
import { updateModal } from "../store/slices/modalSlice";

export default function LandingPageHero() {
  const dispatch = useDispatch();
  const openSignupModal = () => dispatch(updateModal({ currentModal: "signup" }));
  return (
    <section className="flex justify-center items-center w-full min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-72px)] h-full p-5 md:p-10 flex-col gap-4 md:gap-8 lg:gap-12 relative overflow-hidden">
      <img src={mianLogo} alt="left side decoration" className="absolute w-64 rotate-90 top-3 lg:-left-2 xl:left-0 lg:rotate-12 lg:top-16 xs:w-80 xl:w-[500px] aspect-square" />
      <img src={mianLogo} alt="left side decoration" className="absolute w-64 rotate-90 bottom-3 lg:-right-2 xl:right-0 lg:-rotate-12 lg:top-16 scale-x-[-1] xs:w-80 xl:w-[500px] aspect-square" />
      <p className="text-primary text-2xl md:text-3xl lg:text-[40px] lg:leading-[48px]">
        Courseable - Your Course, our responsibility
      </p>
      <Button className="text-white" onClick={openSignupModal}>Join Now</Button>
    </section>
  );
}
