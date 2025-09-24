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
  EquipoDetalleTab,
} from "../../componentes";

const TabsEquipoHv = ({ equipo }) => {
  const { TipoDispositivo, Marca, Serial } = equipo;

  return (
    <>
      {/* <p>
        Equipo {TipoDispositivo} {Marca}, {Serial}{" "}
      </p> */}
      <CCard>
        <CCardBody>
          <CTabs activeItemKey="detalle">
            <CTabList variant="tabs">
              <CTab itemKey="detalle">Detalle equipo</CTab>
              <CTab itemKey="reporte">Reportes</CTab>
              {/* <CTab itemKey="hardware">Hardware</CTab>
              <CTab itemKey="configred">Configuracion de Red</CTab>
              <CTab itemKey="usuario">Usuario Sistemas</CTab>
              <CTab itemKey="acceso">Acceso Remoto</CTab> */}
            </CTabList>

            <CTabContent>
              <CTabPanel className="p-3" itemKey="detalle">
                <CCard
                  className="mb-4"
                  style={{ height: "600px", overflowY: "auto" }}
                >
                  <CCardBody style={{ height: "100%" }}>
                    <EquipoDetalleTab equipo={equipo} />
                  </CCardBody>
                </CCard>
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="reporte">
                <CCard
                  className="mb-4"
                  style={{ height: "600px", overflowY: "auto" }}
                >
                  <CCardBody style={{ height: "100%" }}>
                    {/* <SoftwareTab equipo={equipo} /> */}
                  </CCardBody>
                </CCard>
              </CTabPanel>
              {}
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  );
};

export default TabsEquipoHv;
