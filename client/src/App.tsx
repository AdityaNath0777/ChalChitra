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
      <div className="my-container grid grid-cols-6 relative">
        <div className="col-span-1 relative">
          <Navbar />
        </div>
        <div className="col-span-5">
          <Router>
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
          </Router>
        </div>
      </div>

      {/* {!isRegistered && (
        <div className="w-full mx-auto mt-10">
          <h1 className="text-4xl text-center main-font">ChalChitra</h1>
          <div className="w-2/5 mx-auto py-4">
            <Signin />
            <Button onClick={() => setIsRegistered(true)}>
              Already have an account? Login
            </Button>
          </div>
        </div>
      )}
      {!isLoggedIn && isRegistered && (
        <div className="w-full mx-auto mt-10">
          <h1 className="text-4xl text-center main-font">ChalChitra</h1>
          <div className="w-2/5 mx-auto py-4">
            <Login />
            <Button onClick={() => setIsRegistered(false)}>
              Don&apos;t have an account? Sign In
            </Button>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="my-container grid grid-cols-6 relative">
          <div className="col-span-1 relative">
            <Navbar />
          </div>
          <div className="col-span-5">
            {isUpdating ? (
              <UpdateProfile />
            ) : (
              <>
                <Profile />
                <Button onClick={() => setIsUpdating(true)}>
                  Update Account Details
                </Button>
              </>
            )}
          </div>
        </div>
      )} */}
    </UserProvider>
  );
}

export default App;
