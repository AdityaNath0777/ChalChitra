import { Link } from "react-router-dom";
import { useAuth, useLayout } from "@shared/hooks";
import {
  CreateButton,
  LoginButton,
  MenuButton,
  NotificationIcon,
  ProfileIcon,
} from "./index";
import { SearchForm, SearchButton } from "@features/search/components";
import React from "react";

// interface HeaderProps {
//   showSideBar: boolean;
//   setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Header = () => {
  const { isLoggedIn } = useAuth();
  const { screenSize } = useLayout();

  // console.log("show side bar: ", showSideBar);

  // helper function to reduce cluttering due to conditional rendering
  const renderUserActions = () => {
    return isLoggedIn ? (
      <>
        <CreateButton />
        <NotificationIcon />
        <ProfileIcon />
      </>
    ) : (
      <div>
        <LoginButton />
      </div>
    );
  };

  return (
    // Desktop Header
    <header className="flex justify-between items-center relative py-3">
      {/* Left Header */}
      <div className="grow flex gap-3 pl-4" id="left-header">
        <MenuButton />
        <Link
          className="main-font font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl cursor-pointer"
          to={"/home"}
        >
          Chal Chitra
        </Link>
      </div>

      {/* Center Header */}
      <div className="grow sm:text-center text-right" id="center-header">
        {screenSize === "desktop" ? (
          <SearchForm />
        ) : (
          <SearchButton className="rounded-full aspect-square" />
        )}
      </div>

      {/* Right Header */}
      <div
        className="grow flex justify-end gap-4 pr-4 items-center"
        id="right-header"
      >
        {renderUserActions()}
      </div>
    </header>
  );
};

// Header memoization as it mostly remains same
export default React.memo(Header);
