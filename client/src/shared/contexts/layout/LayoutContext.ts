import { createContext } from "react";

// interface HeaderProps {
//   showSideBar: boolean;
// }

export type ScreenSize = "desktop" | "mobile" | "";

interface LayoutProps {
  showSideBar: boolean;
  toggleSideBar: () => void;
  screenSize: ScreenSize;
  screenWidth: number;
  screenHeight: number;
  // header: HeaderProps;
}

export const LayoutContext = createContext<LayoutProps | null>(null);
