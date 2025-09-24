import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorModes } from '@coreui/react-pro';

// Crear el contexto
const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  const { colorMode, setColorMode } = useColorModes('coreui-pro-react-admin-template-theme-light');
  const [tema, setTema] = useState(colorMode);

  // Función para actualizar el tema
  const updateColor = (tema) => {
    setTema(tema);
    // console.log(tema);
  };

  // Proporcionar el valor del contexto
  return (
    <ThemeContext.Provider value={{ tema, updateColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto
export const useTheme = () => useContext(ThemeContext);
