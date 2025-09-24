import { useEffect } from "react";
import TabsEquipos from "./TabsEquipos";
import { useLocation } from "react-router-dom";

const EquiposDetalle = () => {
  // const nombreD = localStorage.getItem("dependencia-nombre");

  const location = useLocation();
  const { equipo } = location.state || {};

  if (!equipo) {
    return <div>No se encontró información del equipo.</div>;
  }

  console.log(equipo);

  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {}, []);
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////PAGINA PRINCIPAL DEL PROYECTO////////////////////////////////
  return (
    <>
      <TabsEquipos equipo={equipo} />
    </>
  );
};

export default EquiposDetalle;
