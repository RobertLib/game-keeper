import { createContext, useContext, useEffect, useState } from "react";

const DrawerContext = createContext({
  isOpen: false,
  toggleDrawer: () => {},
});

/**
 * @typedef Props
 * @property {React.ReactNode} children
 * @param {Props} props
 */
export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export function useDrawer() {
  return useContext(DrawerContext);
}
