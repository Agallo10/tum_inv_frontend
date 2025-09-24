import { createContext, useContext } from 'react';
import { useCargarDatosStore } from '../hook';


export const DatosContext = createContext();

export const DatosProvider = ({children }) => {
    const {cargarDatos} = useCargarDatosStore();
    return (
    <DatosContext.Provider value={{cargarDatos}}>
      {children}
    </DatosContext.Provider>
  );
};

export const useDatos = () => useContext(DatosContext);
