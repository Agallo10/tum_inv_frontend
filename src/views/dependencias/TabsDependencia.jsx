import {
  CCard,
  CCardBody,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from "@coreui/react-pro";
import {
  LaboresDiarias,
  Riego,
  Siembra,
  Plagas,
  EquipoTab,
} from "../../componentes";
import UsuariosResTab from "../../componentes/usuariosresponsables/UsuariosresponsablesTab";
// import MonitoreoSanidad from "../../componentes/monitoreo/MonitoreoEnfermedades";
// import {ContenedorPlagas} from '../../componentes/plagas/ContenedorPlagas';
//import PlagasTable from '../../componentes/plagas/PlagasTable';

const TabsDependencia = ({ nombreDependencia }) => {
  return (
    <>
      <p>{nombreDependencia}</p>
      <CCard>
        <CCardBody>
          <CTabs activeItemKey="equipo">
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
