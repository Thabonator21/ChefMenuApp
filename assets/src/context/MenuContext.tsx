import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { MenuItem } from '../types';
interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
}
interface MenuProviderProps {
  children: ReactNode;
}
const MenuContext = createContext<MenuContextType | undefined>(undefined);
export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const addMenuItem = (item: MenuItem): void => {
    setMenuItems((currentItems) => [...currentItems, item]);
  };
  const removeMenuItem = (id: string): void => {
    setMenuItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };
  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        removeMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used inside MenuProvider');
  }
  return context;
};
