import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CBadge,
  CCardSubtitle,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilList,
  cilTags,
  cilCog,
  cilDevices,
  cilCloudDownload,
  cilGlobeAlt,
  cilShieldAlt,
  cilCheckCircle,
  cilXCircle,
  cilWarning,
  cilInfo,
} from "@coreui/icons";
import {
  useEquipoStore,
  useConfigRedStore,
  useSoftwareStore,
  useHardwareStore,
  usePerifericoStore,
} from "../../hook";

const EquipoDetalleTab = ({ equipo }) => {
  const { cargarEquipoHv } = useEquipoStore();
  const { cargarAllHardwareByEquipos } = useHardwareStore();
  const { cargarPerifericosByEquipos } = usePerifericoStore();
  const { cargarAllSoftwareByEquipos } = useSoftwareStore();
  const { cargarAllConfigRedByEquipos } = useConfigRedStore();

  const { ID } = equipo;

  const [equipoHv, setEquipoHv] = useState({});
  const [hardawares, setHardawares] = useState([]);
  const [perifericos, setPerifericos] = useState([]);
  const [softwares, setSoftwares] = useState([]);
  const [configRed, setConfigRed] = useState({});

  const cargarEquipo = async () => {
    const equipo = await cargarEquipoHv(ID);
    console.log(equipo);
    setEquipoHv(equipo);
  };

  const cargarRelacionesEquipo = async () => {
    const hardawares = await cargarAllHardwareByEquipos(ID);
    setHardawares(hardawares);
    const perifericos = await cargarPerifericosByEquipos(ID);
    setPerifericos(perifericos);
    const softwares = await cargarAllSoftwareByEquipos(ID);
    setSoftwares(softwares);
    const configRed = await cargarAllConfigRedByEquipos(ID);
    setConfigRed(configRed);
    console.log({ hardawares, perifericos, softwares, configRed });
  };

  useEffect(() => {
    cargarEquipo();
    cargarRelacionesEquipo();
  }, [ID]);

  return (
    <CRow className="g-4">
      <CCol xs={12}>
        {/* Header Card */}
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardHeader className="bg-primary bg-gradient border-0">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <CCardTitle className="mb-1 h4 text-white">
                  {equipoHv.Marca} {equipoHv.Modelo}
                </CCardTitle>
                <CCardSubtitle className="text-white-50">
                  {equipoHv.TipoDispositivo}
                </CCardSubtitle>
              </div>
              <div className="d-flex flex-column gap-2">
                {/* <CBadge
                  color={
                    equipoHv.Estado === "Activo"
                      ? "success"
                      : equipoHv.Estado === "Inactivo"
                        ? "danger"
                        : "warning"
                  }
                  shape="rounded-pill"
                  className="px-3 py-2 fs-6 align-self-end"
                >
                  {equipoHv.Estado === "Activo" && "✅ "}
                  {equipoHv.Estado === "Inactivo" && "❌ "}
                  {equipoHv.Estado === "En Mantenimiento" && "� "}
                  {equipoHv.Estado === "Disponible" && "✅ "}
                  {(!equipoHv.Estado || equipoHv.Estado === "Sin Estado") &&
                    "❓ "}
                  {equipoHv.Estado || "Sin Estado"}
                </CBadge> */}
                {/* <CBadge
                  color="dark"
                  shape="rounded-pill"
                  className="px-3 py-2 fs-6 align-self-end"
                >
                  ID: {equipoHv.ID || ID}
                </CBadge> */}
              </div>
            </div>
          </CCardHeader>
        </CCard>
      </CCol>

      <CCol xs={12} lg={6}>
        {/* Equipment Specifications */}
        <CCard className="h-100 border-0 shadow-sm">
          <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
            <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
              <CIcon icon={cilList} className="text-white" />
              Especificaciones del Equipo
            </CCardTitle>
          </CCardHeader>
          <CCardBody className="p-0">
            <CListGroup flush>
              <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom">
                <div>
                  <div className="fw-bold text-dark">Marca</div>
                  <div className="text-body-secondary small">
                    Fabricante del equipo
                  </div>
                </div>
                <CBadge color="primary" shape="rounded-pill" className="fs-6">
                  {equipoHv.Marca || "N/A"}
                </CBadge>
              </CListGroupItem>

              <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom">
                <div>
                  <div className="fw-bold text-dark">Modelo</div>
                  <div className="text-body-secondary small">
                    Modelo específico
                  </div>
                </div>
                <span className="fw-semibold text-primary">
                  {equipoHv.Modelo || "N/A"}
                </span>
              </CListGroupItem>

              <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom">
                <div>
                  <div className="fw-bold text-dark">Estado</div>
                  <div className="text-body-secondary small">
                    Estado actual del equipo
                  </div>
                </div>
                <CBadge
                  color={
                    equipoHv.Estado === "Activo"
                      ? "success"
                      : equipoHv.Estado === "Inactivo"
                        ? "danger"
                        : equipoHv.Estado === "En Mantenimiento"
                          ? "warning"
                          : equipoHv.Estado === "Disponible"
                            ? "info"
                            : "secondary"
                  }
                  shape="rounded-pill"
                  className="fs-6 d-flex align-items-center gap-1"
                >
                  <CIcon
                    icon={
                      equipoHv.Estado === "Activo" ||
                      equipoHv.Estado === "Disponible"
                        ? cilCheckCircle
                        : equipoHv.Estado === "Inactivo"
                          ? cilXCircle
                          : equipoHv.Estado === "En Mantenimiento"
                            ? cilWarning
                            : cilInfo
                    }
                    size="sm"
                  />
                  {equipoHv.Estado || "Sin Estado"}
                </CBadge>
              </CListGroupItem>

              <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0">
                <div>
                  <div className="fw-bold text-dark">Tipo de Dispositivo</div>
                  <div className="text-body-secondary small">
                    Categoría del equipo
                  </div>
                </div>
                <CBadge color="secondary" shape="rounded-pill" className="fs-6">
                  {equipoHv.TipoDispositivo || "N/A"}
                </CBadge>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} lg={6}>
        {/* Identification Details */}
        <CCard className="h-100 border-0 shadow-sm">
          <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
            <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
              <CIcon icon={cilTags} className="text-white" />
              Identificación
            </CCardTitle>
          </CCardHeader>
          <CCardBody className="p-0">
            <CListGroup flush>
              <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom">
                <div>
                  <div className="fw-bold text-dark">Número Serial</div>
                  <div className="text-body-secondary small">
                    Identificador único del fabricante
                  </div>
                </div>
                <code className="text-primary bg-primary bg-opacity-10 px-2 py-1 rounded">
                  {equipoHv.Serial || "N/A"}
                </code>
              </CListGroupItem>

              <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0">
                <div>
                  <div className="fw-bold text-dark">Placa de Inventario</div>
                  <div className="text-body-secondary small">
                    Código interno de la organización
                  </div>
                </div>
                <code className="text-success bg-success bg-opacity-10 px-2 py-1 rounded">
                  {equipoHv.PlacaInventario || "N/A"}
                </code>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      {equipoHv.Descripcion && (
        <CCol xs={12}>
          {/* Additional Information */}
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <CCardTitle className="h5 mb-0 text-primary d-flex align-items-center gap-2">
                <CIcon icon={cilClipboard} className="text-primary" />
                Información Adicional
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <p className="mb-0 text-body-secondary lh-base">
                {equipoHv.Descripcion}
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      )}

      {/* Hardware Section */}
      {hardawares && hardawares.length > 0 && (
        <CCol xs={12} lg={6}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilCog} className="text-white" />
                Hardware ({hardawares.length})
              </CCardTitle>
            </CCardHeader>
            <CCardBody className="p-0">
              <CListGroup flush>
                {hardawares.slice(0, 5).map((hardware, index) => (
                  <CListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom"
                  >
                    <div>
                      <div className="fw-bold text-dark">
                        {hardware.Componente}
                      </div>
                      <div className="text-body-secondary small">
                        {hardware.Tecnologia}{" "}
                        {hardware.Capacidad && `- ${hardware.Capacidad}`}
                      </div>
                    </div>
                    {/* <CBadge color="info" shape="rounded-pill" className="fs-6">
                      {hardware.Componente}
                    </CBadge> */}
                  </CListGroupItem>
                ))}
                {hardawares.length > 5 && (
                  <CListGroupItem className="text-center py-2 border-0">
                    <small className="text-body-secondary">
                      +{hardawares.length - 5} componentes más
                    </small>
                  </CListGroupItem>
                )}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      )}

      {/* Peripherals Section */}
      {perifericos && perifericos.length > 0 && (
        <CCol xs={12} lg={6}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilDevices} className="text-white" />
                Periféricos ({perifericos.length})
              </CCardTitle>
            </CCardHeader>
            <CCardBody className="p-0">
              <CListGroup flush>
                {perifericos.slice(0, 5).map((periferico, index) => (
                  <CListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom"
                  >
                    <div>
                      <div className="fw-bold text-dark">
                        {periferico.TipoPeriferico}
                      </div>
                      <div className="text-body-secondary small">
                        {periferico.Marca}{" "}
                        {periferico.Serial && `- S/N: ${periferico.Serial}`}
                      </div>
                      {periferico.PlacaInventario && (
                        <div className="text-body-secondary small d-flex align-items-center gap-1">
                          <CIcon
                            icon={cilTags}
                            size="sm"
                            className="text-secondary"
                          />
                          {periferico.PlacaInventario}
                        </div>
                      )}
                    </div>
                    {/* <CBadge
                      color="secondary"
                      shape="rounded-pill"
                      className="fs-6"
                    >
                      {periferico.TipoPeriferico}
                    </CBadge> */}
                  </CListGroupItem>
                ))}
                {perifericos.length > 5 && (
                  <CListGroupItem className="text-center py-2 border-0">
                    <small className="text-body-secondary">
                      +{perifericos.length - 5} periféricos más
                    </small>
                  </CListGroupItem>
                )}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      )}

      {/* Software Section */}
      {softwares && softwares.length > 0 && (
        <CCol xs={12} lg={6}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilCloudDownload} className="text-white" />
                Software ({softwares.length})
              </CCardTitle>
            </CCardHeader>
            <CCardBody className="p-0">
              <CListGroup flush>
                {softwares.slice(0, 5).map((software, index) => (
                  <CListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom"
                  >
                    <div>
                      <div className="fw-bold text-dark">{software.Nombre}</div>
                      <div className="text-body-secondary small">
                        {software.Categoria}{" "}
                        {software.Version && `- v${software.Version}`}
                      </div>
                      {software.TipoLicencia && (
                        <div className="text-body-secondary small d-flex align-items-center gap-1">
                          <CIcon
                            icon={cilShieldAlt}
                            size="sm"
                            className="text-secondary"
                          />
                          {software.TipoLicencia}
                        </div>
                      )}
                    </div>
                    <CBadge
                      color={
                        software.TipoLicencia?.toLowerCase().includes(
                          "licencia"
                        ) ||
                        software.TipoLicencia?.toLowerCase().includes(
                          "propietario"
                        )
                          ? "success"
                          : software.TipoLicencia?.toLowerCase().includes(
                                "libre"
                              )
                            ? "info"
                            : "warning"
                      }
                      shape="rounded-pill"
                      className="fs-6"
                    >
                      {software.Categoria}
                    </CBadge>
                  </CListGroupItem>
                ))}
                {softwares.length > 5 && (
                  <CListGroupItem className="text-center py-2 border-0">
                    <small className="text-body-secondary">
                      +{softwares.length - 5} aplicaciones más
                    </small>
                  </CListGroupItem>
                )}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      )}

      {/* Network Configuration Section */}
      {configRed && Object.keys(configRed).length > 0 && (
        <CCol xs={12} lg={6}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilGlobeAlt} className="text-white" />
                Configuración de Red
              </CCardTitle>
            </CCardHeader>
            <CCardBody className="p-0">
              <CListGroup flush>
                {configRed.DireccionIP && (
                  <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom">
                    <div>
                      <div className="fw-bold text-dark">Dirección IP</div>
                      <div className="text-body-secondary small">
                        {configRed.AsignacionIP
                          ? `${configRed.AsignacionIP}`
                          : "Dirección de red asignada"}
                      </div>
                    </div>
                    <code className="text-info bg-info bg-opacity-10 px-2 py-1 rounded">
                      {configRed.DireccionIP}
                    </code>
                  </CListGroupItem>
                )}
                {configRed.NombreDispositivo && (
                  <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0 border-bottom">
                    <div>
                      <div className="fw-bold text-dark">
                        Nombre del Dispositivo
                      </div>
                      <div className="text-body-secondary small">
                        Identificador en la red
                      </div>
                    </div>
                    <code className="text-secondary bg-secondary bg-opacity-10 px-2 py-1 rounded">
                      {configRed.NombreDispositivo}
                    </code>
                  </CListGroupItem>
                )}
                {configRed.Conectividad && (
                  <CListGroupItem className="d-flex justify-content-between align-items-center py-3 border-0">
                    <div>
                      <div className="fw-bold text-dark">Conectividad</div>
                      <div className="text-body-secondary small">
                        Tipo de conexión de red
                      </div>
                    </div>
                    <CBadge
                      color={
                        configRed.Conectividad?.toLowerCase().includes(
                          "wifi"
                        ) ||
                        configRed.Conectividad?.toLowerCase().includes(
                          "inalámbr"
                        )
                          ? "primary"
                          : configRed.Conectividad?.toLowerCase().includes(
                                "ethernet"
                              ) ||
                              configRed.Conectividad?.toLowerCase().includes(
                                "cable"
                              )
                            ? "success"
                            : "secondary"
                      }
                      shape="rounded-pill"
                      className="fs-6 d-flex align-items-center gap-1"
                    >
                      <CIcon
                        icon={
                          configRed.Conectividad?.toLowerCase().includes(
                            "wifi"
                          ) ||
                          configRed.Conectividad?.toLowerCase().includes(
                            "inalámbr"
                          )
                            ? cilGlobeAlt
                            : cilDevices
                        }
                        size="sm"
                      />
                      {configRed.Conectividad}
                    </CBadge>
                  </CListGroupItem>
                )}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </CRow>
  );
};

export default EquipoDetalleTab;
