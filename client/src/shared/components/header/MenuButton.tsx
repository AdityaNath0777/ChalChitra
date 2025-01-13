import { useLayout } from "@shared/hooks";

const MenuButton = () => {
  const { showSideBar, toggleSideBar } = useLayout();
  return (
    <div
      className="hidden sm:block menu-icon text-center rounded w-10 px-2 py-1 mr-2 cursor-pointer hover:bg-slate-400/25"
      onClick={() => toggleSideBar()}
    >
      <i
        className={`text-xl fa-solid ${showSideBar ? "fa-bars" : "fa-xmark"} `}
      ></i>
    </div>
  );
};

export default MenuButton;
