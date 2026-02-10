import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorModes } from '@coreui/react-pro';

// Crear el contexto
const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  const { colorMode, setColorMode } = useColorModes('coreui-pro-react-admin-template-theme');
  const [tema, setTema] = useState(colorMode);

  // Sincronizar el tema cuando cambia colorMode
  useEffect(() => {
    setTema(colorMode);
  }, [colorMode]);

  // Función para actualizar el tema
  const updateColor = (nuevoTema) => {
    setTema(nuevoTema);
    setColorMode(nuevoTema);
  };

  // Proporcionar el valor del contexto
  return (
    <ThemeContext.Provider value={{ tema, updateColor, colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto
export const useTheme = () => useContext(ThemeContext);
