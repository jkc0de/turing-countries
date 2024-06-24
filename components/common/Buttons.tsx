import { MouseEventHandler } from "react";

interface Button {
  type: "button" | "submit" | "reset";
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  fontSize?: string;
  width?: string;
  textAlign?: string;
  disabled?: boolean;
}

export const ButtonPrimary = ({
  type,
  label,
  onClick,
  fontSize = "text-sm",
  width = "w-full",
  disabled,
}: Button) => {
  return (
    <button
      type={type}
      className={`
      ${disabled ? "bg-gray-300" : "bg-orange-500 hover:bg-orange-600"}
      ${fontSize} ${width} px-4 py-3 text-white font-medium`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
