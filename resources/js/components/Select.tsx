import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  stretch?: boolean;
}

export default function Select({
  options,
  stretch = true,
  className = "",
  ...props
}: SelectProps) {
  const baseStyles =
    "outline-none bg-transparent text-sm text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors border-none mr-2";
  const stretchStyles = stretch ? "self-stretch px-2" : "px-4 py-2";

  return (
    <select
      className={`${baseStyles} ${stretchStyles} ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}