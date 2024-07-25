import { useState } from "react";
import "./App.css";
import { UserContext, UserProvider } from "./contexts";
import { Login, Logout, Profile, Navbar } from "./components/index";

function App() {
  const [user, setUser] = useState({});
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
          password: loginInfo.password
        }),
        credentials: "include"
      });

      if (!res.ok) {
        console.log("Error while fetching", res);
        throw new Error(`Response not okay :: Status :: ${res.status}`);
        return;
      }

      const result = await res.json();
      const newUser = result.data.user;

      setUser(newUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login Failed!!!", error.message);
    }
  };
  const logoutuser = () => {};
  const updateUser = () => {};

  // useEffect -> to fetch details of currently logged in user
  // whenever this component reloads

  return (
    <UserProvider value={{ user, loginUser, logoutuser, updateUser }}>
      <div className="w-4/5 mx-auto">
        <h1 className="text-4xl text-center">ChalChitra</h1>
        {!isLoggedIn && (
          <div className="w-2/5 mx-auto py-4">
            <Login />
          </div>
        )}

        {isLoggedIn && <Profile />}
      </div>
    </UserProvider>
  );
}

export default App;
