import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@shared/hooks";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

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
