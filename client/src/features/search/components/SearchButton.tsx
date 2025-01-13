import { Button } from "@shared/components";
import React from "react";

type ButtonType = "button" | "submit" | "reset";

const SearchButton: React.FC<{ type?: ButtonType; className?: string }> = ({
  type = "button",
  className = "",
}) => {
  return (
    <Button
      type={type}
      className={`rounded-r-full  sm:pl-2 sm:pr-2 sm:py-1 lg:pl-4 lg:pr-6 lg:py-2 bg-slate-400 text-center ${className}`}
    >
      <i className="sm:text-base lg:text-lg fa-solid fa-magnifying-glass"></i>
    </Button>
  );
};

export default SearchButton;
