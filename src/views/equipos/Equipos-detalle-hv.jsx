import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TabsEquipoHv from "./TabsEquiposHv";

const EquiposDetalleHv = () => {
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
      <TabsEquipoHv equipo={equipo} />
    </>
  );
};

export default EquiposDetalleHv;
