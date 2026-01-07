import React, { ReactNode } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface DeviceWidthProviderProps {
  children: ReactNode;
}

export const DeviceWidthContext = React.createContext({
  isDesktopContent: true,
  isMobileContent: false,
});

export const DeviceWidthProvider: React.FC<DeviceWidthProviderProps> = ({ children }) => {
  const isDesktopContent = useMediaQuery("(min-width: 1232px)");
  const isMobileContent = useMediaQuery("(max-width: 623px)");

  return (
    <DeviceWidthContext.Provider value={{ isDesktopContent, isMobileContent }}>
  {children}
  </DeviceWidthContext.Provider>
);
};
