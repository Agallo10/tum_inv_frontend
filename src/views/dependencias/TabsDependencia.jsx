import { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCardTitle,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from "@coreui/react-pro";
import {
  EquipoTab,
} from "../../componentes";
import UsuariosResTab from "../../componentes/usuariosresponsables/UsuariosResponsablesTab.jsx";

const TabsDependencia = ({ nombreDependencia }) => {
  const [activeKey, setActiveKey] = useState("equipo");

  return (
    <>
      {/* Header Card */}
           <CCard className="mb-4 border-0 shadow-sm">
             <CCardHeader className="bg-info bg-gradient border-0">
               <div className="d-flex justify-content-between align-items-center">
                 <div>
                   <CCardTitle className="mb-1 h4 text-white">
                     Dependencia/Oficina - {nombreDependencia}
                   </CCardTitle>
                   <CCardSubtitle className="text-white-50">
                     Administracion de equipos y usuarios responsables
                   </CCardSubtitle>
                 </div>
                 <div className="d-flex flex-column gap-2">
                 </div>
               </div>
             </CCardHeader>
           </CCard>
      <CCard>
        <CCardBody>
          <CTabs activeItemKey={activeKey} onChange={setActiveKey}>
            <CTabList variant="tabs">
              {/* <CTab itemKey="labores">Labores Diarias</CTab> */}
              <CTab itemKey="equipo">Equipos</CTab>
              <CTab itemKey="usuarios">Usuarios Responsables</CTab>
              {/* <CTab itemKey="censoplagas">Censo Plagas</CTab>
              <CTab itemKey="monitoreo">Monitoreo Enfermedades</CTab> */}
            </CTabList>

            <CTabContent>
              {/* <CTabPanel className="p-1" itemKey="labores">
                <LaboresDiarias />
              </CTabPanel> */}

              <CTabPanel className="p-3" itemKey="equipo">
                <CCard
                  className="mb-4"
                  style={{ height: "600px", overflowY: "auto" }}
                >
                  <CCardBody style={{ height: "100%" }}>
                    <EquipoTab />
                  </CCardBody>
                </CCard>
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="usuarios">
                <CCard
                  className="mb-4"
                  style={{ height: "600px", overflowY: "auto" }}
                >
                  <CCardBody style={{ height: "100%" }}>
                    <UsuariosResTab />
                  </CCardBody>
                </CCard>
              </CTabPanel>

              {/* <CTabPanel className="p-3" itemKey="censoplagas">
                <CCardBody
                  style={{
                    height: "100%",
                    maxHeight: "600px",
                    overflowY: "auto",
                  }}
                >
                  <Plagas />
                </CCardBody>
              </CTabPanel> */}

              {/* <CTabPanel className="p-3" itemKey="monitoreo">
                <CCardBody
                  style={{
                    height: "100%",
                    maxHeight: "600px",
                    overflowY: "auto",
                  }}
                >
                  <MonitoreoSanidad />
                </CCardBody>
              </CTabPanel> */}
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  );
};

export default TabsDependencia;
