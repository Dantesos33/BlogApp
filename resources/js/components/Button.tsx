import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "none";
  stretch?: boolean;
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  stretch = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium overflow-hidden";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:   "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    outline:   "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    none:      "",
  };

  const stretchStyles = stretch ? "self-stretch h-full" : "px-6 py-2.5 rounded-lg";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${stretchStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}