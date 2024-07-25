import React from "react";

const Button = ({ children, className, textSize, type, onClick }) => {
  return (
    <div className="w-full mx-auto">
      <button
        className={`${className} rounded px-3 py-1`}
        style={{ fontSize: `${textSize}` }}
        type={`${type}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
