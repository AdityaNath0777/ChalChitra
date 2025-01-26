import { useNavigate } from "react-router-dom";
import Button from "../Button";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Button
      className="bg-slate-400/20 backdrop:filter drop-shadow-md rounded-full px-2 py-1 sm:px-4  sm:py-2"
      onClick={handleLoginClick}
    >
      <i className="text-base sm:text-lg fa-solid fa-user mx-2"></i>
      <span className="text-base sm:text-lg lg:text-lg mr-2">Log in</span>
    </Button>
  );
};

export default LoginButton;
