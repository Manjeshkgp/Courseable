import { ButtonHTMLAttributes, FC } from "react";

const styles = {
  primary:
    "flex h-[40px] px-8 py-10 justify-center items-center gap-10 rounded-full bg-primary text-slate-50 text-16 font-semibold min-w-[175px] transition-all duration-300 hover:bg-white hover:text-primary hover:border-primary border hover:border-solid border-primary hover:brightness-100",
  secondary:
    "flex min-w-[102px] w-[fit-content] px-2 py-1 justify-center items-center gap-10 rounded-lg border border-solid border-slate-950 text-slate-950 text-center text-20 font-medium relative z-0 overflow-hidden transition-all duration-400 after:transition-all after:duration-400 after:content'' after:absolute after:left-1/2 after:top-1/2 after:block after:w-0 after:h-0 after:bg-primary after:-z-[1] after:opacity-0 after:rounded-lg hover:after:w-[110%] hover:after:h-full hover:after:-left-[5%] hover:after:top-0 hover:after:opacity-80 hover:text-white hover:border-white",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: keyof typeof styles;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button className={styles[variant]} {...props}>
      {children ?? "Enter some text"}
    </button>
  );
};

export default Button;
