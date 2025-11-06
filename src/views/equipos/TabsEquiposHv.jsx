import { useState } from "react";
import {
  CCard,
  CCardBody,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from "@coreui/react-pro";
import { EquipoDetalleTab, ReportesTab } from "../../componentes";

const TabsEquipoHv = ({ equipo }) => {
  const [activeKey, setActiveKey] = useState("detalle");
  const { TipoDispositivo, Marca, Serial } = equipo;

  return (
    <>
      {/* <p>
        Equipo {TipoDispositivo} {Marca}, {Serial}{" "}
      </p> */}
      <CCard className="h-100">
        <CCardBody className="p-0">
          <CTabs activeItemKey={activeKey} onChange={setActiveKey} className="h-100">
            <CTabList variant="tabs" className="mx-3 mt-3">
              <CTab itemKey="detalle">Detalle equipo</CTab>
              <CTab itemKey="reporte">Reportes de equipo</CTab>
              {/* <CTab itemKey="hardware">Hardware</CTab>
              <CTab itemKey="configred">Configuracion de Red</CTab>
              <CTab itemKey="usuario">Usuario Sistemas</CTab>
              <CTab itemKey="acceso">Acceso Remoto</CTab> */}
            </CTabList>

            <CTabContent className="flex-grow-1">
              <CTabPanel className="p-3 h-100" itemKey="detalle">
                <div
                  className="h-100"
                  style={{ minHeight: "calc(100vh - 250px)" }}
                >
                  <EquipoDetalleTab equipo={equipo} />
                </div>
              </CTabPanel>

              <CTabPanel className="p-3 h-100" itemKey="reporte">
                <div
                  className="h-100"
                  style={{ minHeight: "calc(100vh - 250px)" }}
                >
                  {/* <SoftwareTab equipo={equipo} /> */}
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <ReportesTab equipo={equipo} />
                  </div>
                </div>
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  );
};

export default TabsEquipoHv;
