import React, { useEffect, useState } from "react";
import { LayoutContext, ScreenSize } from "./LayoutContext";

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<ScreenSize>("");
  const [screenWidth, setScreenWidth] = useState<number>(170);
  const [screenHeight, setScreenHeight] = useState<number>(100);

  const toggleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const currentScreenWidth = window.innerWidth;
      const currentScreenHeight = window.innerHeight;
      setScreenWidth(currentScreenWidth);
      setScreenHeight(currentScreenHeight);

      const currentScreenSize = window.matchMedia("(min-width: 640px)").matches
        ? "desktop"
        : "mobile";
      setScreenSize(currentScreenSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ showSideBar, toggleSideBar, screenSize, screenWidth, screenHeight }}>
      {children}
    </LayoutContext.Provider>
  );
};
