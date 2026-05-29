import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  stretch?: boolean;
}

export default function Input({
  className = "",
  stretch = true,
  ...props
}: InputProps) {
  const baseStyles =
    "outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent transition-all duration-300";
  const stretchStyles = stretch ? "w-full h-full px-4 py-3" : "px-4 py-2";

  return (
    <input
      className={`${baseStyles} ${stretchStyles} ${className}`}
      {...props}
    />
  );
}