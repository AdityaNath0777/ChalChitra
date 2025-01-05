import { useState } from "react";
import { useUser } from "../contexts";
import SearchForm from "./Search/SearchForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isLoggedIn } = useUser();
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();
  
  const handleSigninClick = () => {
    navigate("/signin");
  };
  const handleHomeNavigation = () => {
    navigate("/home");
  };

  return (
    // Desktop Header
    <div className="flex justify-between items-center relative">
      <div className="grow flex gap-3 pl-4" id="left-header">
        <div
          className="menu-icon w-4 mx-2"
          onClick={() => setShowSideBar((prev) => !prev)}
        >
          {showSideBar ? (
            <i className="text-xl fa-solid fa-bars"></i>
          ) : (
            <i className="text-xl fa-solid fa-xmark"></i>
          )}
        </div>
        <h1
          className="main-font font-bold text-2xl cursor-pointer"
          onClick={handleHomeNavigation}
        >
          Chal Chitra
        </h1>
      </div>
      <div className="grow text-center " id="center-header">
        <SearchForm />
      </div>
      <div
        className="grow flex justify-end  gap-4 pr-4 items-center"
        id="right-header"
      >
        {isLoggedIn ? (
          <>
            <div className="create-video-icon cursor-pointer text-center p-2 pr-4 rounded-full bg-slate-400">
              ➕ Create
            </div>
            <div className="notification-icon cursor-pointer px-2 pt-1 pb-3 rounded-full bg-slate-400">
              🔔
            </div>
            <div className="profile-icon cursor-pointer ">
              <img
                src={user?.avatar}
                alt={`${user?.fullName}'s profile icon`}
                width={"40px"}
                height={"40px"}
                className="rounded-full object-contain"
              />
            </div>
          </>
        ) : (
          <button
            onClick={handleSigninClick}
            className="bg-slate-400/20 backdrop:filter  drop-shadow-md rounded-full px-4 py-2"
          >
            <i className="text-lg fa-solid fa-user mx-2"></i>
            <span className="text-lg mr-2">Sign in</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
