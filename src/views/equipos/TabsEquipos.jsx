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
  SoftwareTab,
  HardwareTab,
  PerifericosTab,
  ConfigRedTab,
  UsuarioSistemaTab,
  AccesoRemotoTab,
} from "../../componentes";

const TabsEquipo = ({ equipo }) => {
  const [activeKey, setActiveKey] = useState("perifericos");
  const { TipoDispositivo, Marca, Serial } = equipo;

  return (
    <>
      {/* Header Card */}
      <CCard className="mb-4 border-0 shadow-sm">
        <CCardHeader className="bg-info bg-gradient border-0">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <CCardTitle className="mb-1 h4 text-white">
                {Marca} {Serial}
              </CCardTitle>
              <CCardSubtitle className="text-white-50">
                {TipoDispositivo}
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
              <CTab itemKey="perifericos">Perifericos</CTab>
              <CTab itemKey="software">Software</CTab>
              <CTab itemKey="hardware">Hardware</CTab>
              <CTab itemKey="configred">Configuracion de Red</CTab>
              <CTab itemKey="usuario">Usuario Sistemas</CTab>
              <CTab itemKey="acceso">Acceso Remoto</CTab>
            </CTabList>

            <CTabContent>
              <CTabPanel className="p-1" itemKey="perifericos">
                <PerifericosTab equipo={equipo} />
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="software">
                <CCard
                  className="mb-4"
                  style={{ height: "600px", overflowY: "auto" }}
                >
                  <CCardBody style={{ height: "100%" }}>
                    <SoftwareTab equipo={equipo} />
                  </CCardBody>
                </CCard>
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="hardware">
                <CCard
                  className="mb-4"
                  style={{ height: "600px", overflowY: "auto" }}
                >
                  <CCardBody style={{ height: "100%" }}>
                    <HardwareTab equipo={equipo} />
                  </CCardBody>
                </CCard>
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="configred">
                <CCardBody
                  style={{
                    height: "100%",
                    maxHeight: "600px",
                    overflowY: "auto",
                  }}
                >
                  <ConfigRedTab equipo={equipo} />
                </CCardBody>
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="usuario">
                <CCardBody
                  style={{
                    height: "100%",
                    maxHeight: "600px",
                    overflowY: "auto",
                  }}
                >
                  <UsuarioSistemaTab equipo={equipo} />
                </CCardBody>
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="acceso">
                <CCardBody
                  style={{
                    height: "100%",
                    maxHeight: "600px",
                    overflowY: "auto",
                  }}
                >
                  <AccesoRemotoTab equipo={equipo} />
                </CCardBody>
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  );
};

export default TabsEquipo;
