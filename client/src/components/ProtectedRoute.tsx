import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts";

const ProtectedRoute = () => {
  const { isLoggedIn } = useUser();

  console.log("is logged in: ", isLoggedIn);

  return isLoggedIn ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
