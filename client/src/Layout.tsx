import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Header, Navbar } from "@shared/components";
import { useTheme } from "@shared/hooks";

const Layout = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(true);

  const {theme} = useTheme();
  console.log("Theme: ", theme);

  return (
    <div className="fixed w-screen h-screen">
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="my-container flex h-screen relative">
        <div
          className={`relative duration-200 max-w-60 ${
            showSideBar ? "w-full" : "w-auto"
          }`}
        >
          <Navbar showSideBar={showSideBar} />
        </div>
        <main className={`overflow-y-scroll mb-20 no-scrollbar flex-grow px-8`}>
          <div className="relative">
            <div className="absolute w-full">
              <AppRoutes />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
