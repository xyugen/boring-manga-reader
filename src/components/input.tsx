import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "bg-slate-400 text-white rounded-xl py-1.5 px-2.5 outline-none border-none hover:cursor-pointer hover:bg-gray-300 hover:text-slate-600 transition ease-in-out duration-150 focus:bg-gray-100 focus:text-slate-950 focus:cursor-text",
        className
      )}
      {...props}
    />
  );
};

export default Input;
