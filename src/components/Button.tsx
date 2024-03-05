import { FC } from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
  style?: string;
}

const Button: FC<ButtonProps> = ({ title, onClick, style }: ButtonProps) => {
  return (
    <div>
      <button
        className={`bg-white w-full text-indigo-950 border border-indigo-950 hover:bg-indigo-400 rounded-md p-2 ${style}`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
