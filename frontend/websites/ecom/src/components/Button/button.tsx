import { JSX, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
  variant?: "primary" | "secondary";
  outlined?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  outlined = false,
  disabled = false,
  type = "button",
}: Readonly<ButtonProps>): JSX.Element {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${
        variant === "primary"
          ? outlined
            ? "border border-fuchsia-950 bg-fuchsia-100 text-fuchsia-950"
            : "bg-fuchsia-950 text-white"
          : outlined
            ? "border border-orange-500 bg-orange-100 text-black"
            : "bg-orange-500 text-white"
      } flex items-center space-x-3 rounded-full px-4 py-2 font-medium`}
    >
      {children}
    </button>
  );
}
