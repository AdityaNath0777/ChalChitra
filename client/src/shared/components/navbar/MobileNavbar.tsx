import { Link } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <nav>
      <div className="px-4 py-2  w-screen h-full left-0 border-r-2 border-gray-500">
        <ul className="w-full flex gap-4 justify-between px-2">
          <Link to={"/home"}>
            <li className="cursor-pointer text-lg hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-solid fa-house"></i>
              </span>
            </li>
          </Link>
          <Link to={"/subscriptions"}>
            <li className="cursor-pointer text-lg hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-solid fa-layer-group"></i>
              </span>
            </li>
          </Link>
          <Link to={"/history"}>
            <li className="cursor-pointer text-lg hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-solid fa-clock"></i>
              </span>
            </li>
          </Link>
          <Link to={"/twitter"}>
            <li className="cursor-pointer text-lg hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-brands fa-twitter"></i>
              </span>
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className="cursor-pointer text-lg hover:bg-slate-400/25 px-2 py-1 rounded-md">
              <span className="nav-icon">
                <i className="fa-solid fa-user"></i>
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;
