import { useNavigate } from "react-router-dom";

const Navbar = ({ showSideBar }: { showSideBar: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-2  w-full h-screen left-0 border-r-2 border-gray-500">
      <nav>
        <ul className="w-full flex flex-col gap-4 justify-center">
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => navigate("/home")}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-house"></i>
            </span>{" "}
            <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
              Home
            </span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {}}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-layer-group"></i>
            </span>{" "}
            <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
              Subscriptions
            </span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {}}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-clock"></i>
            </span>{" "}
            <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
              History
            </span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {}}
          >
            <span className="nav-icon">
              <i className="fa-brands fa-twitter"></i>
            </span>{" "}
            <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
              Tweets
            </span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-user"></i>
            </span>{" "}
            <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
              Profile
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
