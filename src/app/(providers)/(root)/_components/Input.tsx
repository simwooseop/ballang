import { ComponentProps } from "react";

type InputProps = {
  errorText?: string;
  type: string;
  placeholder: string;
} & ComponentProps<"input">;

function Input({ errorText, type, placeholder, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        className="border border-black rounded-sm"
        type={type}
        placeholder={placeholder}
        {...props}
      />
      <span className="text-sm mx-auto h-5  text-red-600">{errorText}</span>
    </div>
  );
}

export default Input;
