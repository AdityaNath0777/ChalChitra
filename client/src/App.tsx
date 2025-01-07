// import { useEffect, useState } from "react";
import "./App.css";
import { UserProvider } from "./contexts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  // Button,
  Login,
  Navbar,
  Profile,
  Signin,
  // UpdateProfile,
} from "./components";
import useUserHook from "./hooks/useUserHook";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  const {
    user,
    error,
    isLoggedIn,
    // isRegistered,
    // isUpdating,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
    // setIsRegistered,
    // setIsUpdating,
  } = useUserHook();

  return (
    <UserProvider
      value={{
        user,
        error,
        registerUser,
        isLoggedIn,
        loginUser,
        logoutUser,
        updateUser,
      }}
    >
      <Router>
        <Header />
        <div className="my-container grid grid-cols-6 relative">
          <div className="col-span-1 relative">
            <Navbar />
          </div>
          <div className="col-span-5 px-8">
            <Routes>
              <Route path="/" element={<Navigate to={"/home"} replace />} />
              <Route path="/home" element={<div>Home</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/channel/:channelId" element={<>user channel</>} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/dashboard"
                  element={<>protected dashboard...</>}
                />
              </Route>
              <Route path="*" element={<>Page Not Found...</>} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
