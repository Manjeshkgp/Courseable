import Button from "../components/Button";

export default function LandingPageHero() {
  return (
    <section className="flex justify-center items-center w-full min-h-screen h-full p-5 md:p-10 flex-col gap-4 md:gap-8 lg:gap-12">
      <p className="text-primary text-2xl md:text-3xl lg:text-[40px] lg:leading-[48px]">
        Courseable - Your Course, our responsibility
      </p>
      <Button>Join Now</Button>
    </section>
  );
}
