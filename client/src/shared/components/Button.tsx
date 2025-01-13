import React from "react";

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  textSize?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  textSize,
  type,
  onClick,
  ...props
}) => {
  return (
    <div className="w-full mx-auto">
      <button
        className={`rounded px-3 py-1 ${className}`}
        style={{ fontSize: `${textSize}` }}
        type={type}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
