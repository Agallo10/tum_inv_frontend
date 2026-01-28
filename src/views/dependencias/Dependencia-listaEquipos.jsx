import { useEffect, useState } from "react";
import { useEquipoStore } from "../../hook/equipos/useEquipoStore";
import EquiposTableHv from "../../componentes/equipos/EquiposTableHv";
import { CCard, CCardHeader, CCardSubtitle, CCardTitle } from "@coreui/react-pro";

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
  return <>

  {/* Header Card */}
             <CCard className="mb-4 border-0 shadow-sm">
               <CCardHeader className="bg-info bg-gradient border-0">
                 <div className="d-flex justify-content-between align-items-center">
                   <div>
                     <CCardTitle className="mb-1 h4 text-white">
                       Dependencia/Oficina - {nombreDependencia}
                     </CCardTitle>
                     <CCardSubtitle className="text-white-50">
                                     Lista de Equipos - Hoja de Vida y reportes
                                   </CCardSubtitle>
                   </div>
                   <div className="d-flex flex-column gap-2">
                   </div>
                 </div>
               </CCardHeader>
             </CCard>
  
  {<EquiposTableHv equipos={equipos} pages={50} />}</>;
};

export default DependenciaListaEquipos;
