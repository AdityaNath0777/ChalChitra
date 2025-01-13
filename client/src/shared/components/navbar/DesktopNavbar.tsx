import { Link } from "react-router-dom";

const DesktopNavbar = ({ showSideBar }: { showSideBar: boolean }) => {
  return (
    <nav>
      <div className="px-4 py-2  w-full h-screen left-0 border-r-2 border-gray-500">
        <ul className="w-full flex flex-col gap-4 justify-center">
          <Link to={"/home"}>
            <li
              className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
              // onClick={() => navigate("/home")}
            >
              <span className="nav-icon">
                <i className="fa-solid fa-house"></i>
              </span>{" "}
              <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
                Home
              </span>
            </li>
          </Link>
          <Link to={"/subscriptions"}>
            <li className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-solid fa-layer-group"></i>
              </span>{" "}
              <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
                Subscriptions
              </span>
            </li>
          </Link>
          <Link to={"/history"}>
            <li className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-solid fa-clock"></i>
              </span>{" "}
              <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
                History
              </span>
            </li>
          </Link>
          <Link to={"/twitter"}>
            <li className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-brands fa-twitter"></i>
              </span>{" "}
              <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
                Tweets
              </span>
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-solid fa-user"></i>
              </span>{" "}
              <span className={`nav-name ${showSideBar ? "" : "hidden"}`}>
                Profile
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
