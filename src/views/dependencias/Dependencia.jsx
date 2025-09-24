import { useEffect } from "react";
import TabsDependencia from "./TabsDependencia";

const Dependencia = () => {
  const nombreDependencia = localStorage.getItem("dependencia-nombre");

  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {}, []);
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////PAGINA PRINCIPAL DEL PROYECTO////////////////////////////////
  return (
    <>
      <TabsDependencia nombreDependencia={nombreDependencia} />
    </>
  );
};

export default Dependencia;
