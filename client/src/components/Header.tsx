import { useUser } from "../contexts";
import SearchForm from "./Search/SearchForm";

const Header = () => {
  const { user } = useUser();
  return (

    // Desktop Header
    <div className="flex justify-between items-center relative">
      <div className="grow flex gap-3 pl-4" id="left-header">
        {/* hamburger icon */}
        📚
        <h1 className="main-font font-bold text-2xl cursor-pointer">
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
      </div>
    </div>
  );
};

export default Header;
