import { useLayoutContext } from "@shared/contexts";

export const useLayout = () => {
  const layoutLib = useLayoutContext;

  return layoutLib();
};
