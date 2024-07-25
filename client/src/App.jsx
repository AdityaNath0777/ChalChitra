import { useEffect, useState } from "react";
import "./App.css";
import { UserProvider } from "./contexts";
import { Login, Navbar, Profile } from "./components/index";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const updateUser = () => {};

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

  return (
    <UserProvider value={{ user, error, loginUser, logoutUser, updateUser }}>
      {!isLoggedIn && (
        <div className="w-full mx-auto mt-10">
          <h1 className="text-4xl text-center main-font">ChalChitra</h1>
          <div className="w-2/5 mx-auto py-4">
            <Login />
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
