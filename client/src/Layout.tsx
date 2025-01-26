import { useEffect, useRef, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Header, MobileNavbar, DesktopNavbar } from "@shared/components";
import { useTheme, useLayout } from "@shared/hooks";

const Layout = () => {
  // const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [contentHeight, setContentHeight] = useState<string>("");
  const [mobileH, setMobileH] = useState<string>("");
  const { showSideBar, screenSize } = useLayout();

  const { theme } = useTheme();
  console.log("Theme: ", theme);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  const calculateContentHeight = () => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const mobileNavHeight = mobileNavRef.current?.offsetHeight || 0;
    const totalHeight = window.innerHeight - (headerHeight + mobileNavHeight);
    setMobileH(`${mobileNavHeight}px`);
    setContentHeight(`${totalHeight}px`);
  };

  useEffect(() => {
    // calculate height on initial render
    calculateContentHeight();

    // calculate height on window resize
    window.addEventListener("resize", calculateContentHeight);

    // cleanup function to remove the event listener
    return () => window.removeEventListener("resize", calculateContentHeight);
    // it is called when the component unmounts
  }, [mobileH]);

  return (
    <div className="fixed w-screen h-screen">
      <div id="header-container relative" ref={headerRef}>
        <Header />
      </div>
      <div
        className="my-container flex sm:h-screen relative"
        id="content-container"
        style={{ height: contentHeight }}
      >
        {screenSize === "desktop" ? (
          <div
            className={`relative duration-200 max-w-60 ${
              showSideBar ? "w-full" : "w-auto"
            }`}
          >
            <DesktopNavbar showSideBar={showSideBar} />
          </div>
        ) : null}
        <main
          className={`relative overflow-scroll no-scrollbar flex-grow py-4 px-6 sm:px-8`}
        >
          <div className="relative">
            <div className="absolute w-full">
              <AppRoutes />
            </div>
          </div>
        </main>
      </div>
      {screenSize === "mobile" ? (
        <div
          className="relative"
          id="mobile-navbar-container"
          ref={mobileNavRef}
        >
          <MobileNavbar />
        </div>
      ) : null}
    </div>
  );
};

export default Layout;
