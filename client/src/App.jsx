import { useEffect, useState } from "react";
import "./App.css";
import { UserProvider } from "./contexts";
import { Button, Login, Navbar, Profile, Signin } from "./components/index";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const loginUser = async (loginInfo) => {
    try {
      const res = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInfo.email,
          password: loginInfo.password,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Error while fetching", res);
        throw new Error(`Response not okay :: Status :: ${res.status}`);
      }

      const result = await res.json();
      const newUser = result.data.user;

      setUser(newUser);
      setIsLoggedIn(true);
      setError({
        message: "",
        status: "",
      });
    } catch (error) {
      console.log("Login Failed!!!", error.message);
      setError(error);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch("/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Logout Error :: ", res);
        throw new Error(`Logout ERROR :: ${res.status}`);
      }

      console.log("Logged Out successfully");
      setUser({});
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Logout failed :: ", error.message);
    }

    setError({
      message: "",
      status: "",
    });
  };

  const updateUser = async () => {};

  // useEffect -> to fetch details of currently logged in user
  // whenever this component reloads
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await fetch("/api/v1/users/current-user", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("response not ok");
          throw new Error(`Could not get currenr User :: ${res.status}`);
        }

        const result = await res.json();

        // here our user data is in result.data
        setUser(result.data);
        setIsLoggedIn(true);
        setIsRegistered(true);
      } catch (error) {
        console.log("Could not get current user :: ", error);
      }
    }

    getCurrentUser();
    setError({
      message: "",
      status: "",
    });
  }, []);

  const registerUser = async (signinInfo) => {
    // register user logic
    try {
      // console.log(signinInfo);
      const test = new FormData();

      const formData = new FormData();

      // Append regular fields
      formData.append("fullName", signinInfo.fullName);
      formData.append("email", signinInfo.email);
      formData.append("username", signinInfo.username);
      formData.append("password", signinInfo.password);

      if (signinInfo.avatar) {
        formData.append("avatar", signinInfo.avatar); // Use the file object directly
      }
      if (signinInfo.coverImage) {
        formData.append("coverImage", signinInfo.coverImage); // Use the file object directly
      }
      console.log("test: ", formData);
      const config = {
        method: "POST",
        body: formData,
        credentials: "include",
      };

      const res = await fetch("/api/v1/users/register", config);
      console.log(res);
      if (!res.ok) {
        throw new Error(`response not okay: status: ${res.status}`);
      }
      const result = await res.json();
      const data = result?.data || "Register response :: Data not found 🥸";
      console.log(data);
      setIsRegistered(true);
    } catch (error) {
      console.log("Register User :: Error :: ", error);
    }
  };

  return (
    <UserProvider
      value={{ user, error, registerUser, loginUser, logoutUser, updateUser }}
    >

    {!isRegistered && (
      <div className="w-full mx-auto mt-10">
        <h1 className="text-4xl text-center main-font">ChalChitra</h1>
        <div className="w-2/5 mx-auto py-4">
          <Signin />
          <Button
        onClick={() => setIsRegistered(true)}
      >
        Already have an account? 
        Login
      </Button>
        </div>
      </div>
    )}
      {!isLoggedIn && isRegistered && (
        <div className="w-full mx-auto mt-10">
          <h1 className="text-4xl text-center main-font">ChalChitra</h1>
          <div className="w-2/5 mx-auto py-4">
            <Login />
            <Button
        onClick={() => setIsRegistered(false)}
      >
        Don't have an account? 
        Sign In
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
            <Profile />
          </div>
        </div>
      )}
    </UserProvider>
  );
}

export default App;
