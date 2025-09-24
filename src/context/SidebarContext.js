import { createContext, useContext } from 'react';
import { useSidebarState } from './estadoSidebarState'; // Asegúrate de usar llaves aquí

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const sidebarState = useSidebarState();
  //console.log(sidebarState);
  return (
    <SidebarContext.Provider value={sidebarState}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
