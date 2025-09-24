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
  SoftwareTab,
  HardwareTab,
  PerifericosTab,
  ConfigRedTab,
  UsuarioSistemaTab,
  AccesoRemotoTab,
} from "../../componentes";

const TabsEquipo = ({ equipo }) => {
  const { TipoDispositivo, Marca, Serial } = equipo;

  return (
    <>
      <p>
        Equipo {TipoDispositivo} {Marca}, {Serial}{" "}
      </p>
      <CCard>
        <CCardBody>
          <CTabs activeItemKey="perifericos">
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
