import { useEffect, useState } from "react";
import { useEquipoStore } from "../../hook/equipos/useEquipoStore";
import EquiposTableHv from "../../componentes/equipos/EquiposTableHv";

const DependenciaListaEquipos = () => {
  const nombreDependencia = localStorage.getItem("dependencia-nombre");
  const uid = localStorage.getItem("dependencia-id");

  const { cargarEquiposByDependencia } = useEquipoStore();

  const [equipos, setEquipos] = useState([]);

  const cargarEquipos = async () => {
    const equipos = await cargarEquiposByDependencia(uid);
    // console.log(equipos);
    setEquipos(equipos);
  };

  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!uid) return;
    // cargaSiembras();
    cargarEquipos();
  }, [uid]);

  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////PAGINA PRINCIPAL DEL PROYECTO////////////////////////////////
  return <>{<EquiposTableHv equipos={equipos} pages={50} />}</>;
};

export default DependenciaListaEquipos;
