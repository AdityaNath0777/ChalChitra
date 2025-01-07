import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="px-4 py-2 fixed h-screen left-0 border-r-2 border-gray-500"
      style={{ width: "calc(100%*1/6)" }}
    >
      <nav>
        <ul className="w-full flex flex-col gap-4 justify-center">
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => navigate("/home")}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-house"></i>
            </span>{" "}
            <span className="nav-name">Home</span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {}}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-layer-group"></i>
            </span>{" "}
            <span className="nav-name">Subscriptions</span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {}}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-clock"></i>
            </span>{" "}
            <span className="nav-name">History</span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {}}
          >
            <span className="nav-icon">
              <i className="fa-brands fa-twitter"></i>
            </span>{" "}
            <span className="nav-name">Tweets</span>
          </li>
          <li
            className="cursor-pointer text-xl hover:bg-slate-400/25 px-2 py-1 rounded-md"
            onClick={() => {}}
          >
            <span className="nav-icon">
              <i className="fa-solid fa-user"></i>
            </span>{" "}
            <span className="nav-name">Profile</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
