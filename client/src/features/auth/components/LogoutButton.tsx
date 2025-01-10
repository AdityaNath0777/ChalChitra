import { Button } from "@shared/components";
import { useAuth } from "@shared/hooks";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Button
        className={"bg-red-500 main-font text-xl"}
        type={"submit"}
        textSize={"1.2rem"}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
