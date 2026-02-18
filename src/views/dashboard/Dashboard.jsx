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
  CAlert,
  CSpinner,
} from "@coreui/react-pro";
import { CChartDoughnut, CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilBuilding,
  cilDevices,
  cilChartPie,
  cilInfo,
  cilCheckCircle,
  cilWarning,
  cilXCircle,
  cilBan,
  cilPeople,
} from "@coreui/icons";
import { useDashboardStore } from "../../hook/dashboard/useDashboardStore";

const Dashboard = () => {
  const { cargarDashboardStats } = useDashboardStore();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar todos los datos en una sola petición
  const cargarDatos = async () => {
    setLoading(true);
    try {
      const data = await cargarDashboardStats();
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error("❌ Error al cargar datos del dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Valores derivados de stats
  const totalSecretarias = stats?.totalSecretarias || 0;
  const totalDependencias = stats?.totalDependencias || 0;
  const totalEquipos = stats?.totalEquipos || 0;
  const equiposSinAsignar = stats?.equiposSinAsignar || 0;
  const usuariosLibres = stats?.usuariosLibres || 0;
  const secretarias = stats?.secretarias || [];

  // Equipos por estado (ya viene calculado del backend)
  const equiposPorEstado = {};
  (stats?.equiposPorEstado || []).forEach(({ estado, cantidad }) => {
    equiposPorEstado[estado] = cantidad;
  });

  // Equipos por tipo (ya viene calculado del backend)
  const equiposPorTipo = {};
  (stats?.equiposPorTipo || []).forEach(({ tipo, cantidad }) => {
    equiposPorTipo[tipo] = cantidad;
  });

  // Equipos por secretaría (ya viene calculado del backend)
  const equiposPorSecretaria = {};
  secretarias.forEach((sec) => {
    equiposPorSecretaria[sec.Nombre] = sec.totalEquipos;
  });

  // Datos para gráfica de dona (Estados)
  const chartDataEstados = {
    labels: Object.keys(equiposPorEstado),
    datasets: [
      {
        data: Object.values(equiposPorEstado),
        backgroundColor: [
          "#28a745", // Verde - Activo
          "#dc3545", // Rojo - Inactivo
          "#ffc107", // Amarillo - Mantenimiento
          "#17a2b8", // Azul - Disponible
          "#6c757d", // Gris - Sin Estado
        ],
        hoverBackgroundColor: [
          "#218838",
          "#c82333",
          "#e0a800",
          "#138496",
          "#5a6268",
        ],
      },
    ],
  };

  // Datos para gráfica de barras (Equipos por Secretaría)
  const chartDataSecretarias = {
    labels: Object.keys(equiposPorSecretaria),
    datasets: [
      {
        label: "Equipos",
        backgroundColor: "#321fdb",
        borderColor: "#321fdb",
        borderWidth: 1,
        data: Object.values(equiposPorSecretaria),
      },
    ],
  };

  // Datos para gráfica de línea (Tipos de Dispositivos)
  const chartDataTipos = {
    labels: Object.keys(equiposPorTipo).slice(0, 10), // Top 10
    datasets: [
      {
        label: "Cantidad de Equipos",
        backgroundColor: "rgba(50, 31, 219, 0.2)",
        borderColor: "#321fdb",
        pointBackgroundColor: "#321fdb",
        pointBorderColor: "#fff",
        data: Object.values(equiposPorTipo).slice(0, 10),
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <CSpinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <CRow className="g-4">
      {/* Header Section */}
      <CCol xs={12}>
        <CCard style={{ backgroundColor: "#39f", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0))" }} className="border-0 shadow-sm text-white">
          <CCardBody className="p-4">
            <div className="d-flex align-items-center gap-3">
              <CIcon icon={cilSpeedometer} size="3xl" />
              <div>
                <h2 className="mb-2">Sistema de Inventario de Equipos</h2>
                <p className="mb-0 opacity-75">
                  Plataforma integral para la gestión y seguimiento del
                  inventario tecnológico de las secretarías. Este sistema
                  permite administrar equipos de cómputo, periféricos, software
                  y configuraciones de red de manera centralizada.
                </p>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Estadísticas Generales */}
      <CCol xs={12} sm={6} lg={4}>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-6 fw-semibold text-body-secondary text-uppercase small">
                  Secretarías
                </div>
                <div className="fs-2 fw-semibold text-primary">
                  {totalSecretarias}
                </div>
              </div>
              <div className="bg-primary bg-opacity-10 rounded p-3">
                <CIcon icon={cilBuilding} size="xl" className="text-primary" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6} lg={4}>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-6 fw-semibold text-body-secondary text-uppercase small">
                  Dependencias
                </div>
                <div className="fs-2 fw-semibold text-success">
                  {totalDependencias}
                </div>
              </div>
              <div className="bg-success bg-opacity-10 rounded p-3">
                <CIcon icon={cilBuilding} size="xl" className="text-success" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6} lg={4}>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-6 fw-semibold text-body-secondary text-uppercase small">
                  Total Equipos
                </div>
                <div className="fs-2 fw-semibold text-info">{totalEquipos}</div>
              </div>
              <div className="bg-info bg-opacity-10 rounded p-3">
                <CIcon icon={cilDevices} size="xl" className="text-info" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6} lg={4}>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-6 fw-semibold text-body-secondary text-uppercase small">
                  Tipos de Equipos
                </div>
                <div className="fs-2 fw-semibold text-warning">
                  {Object.keys(equiposPorTipo).length}
                </div>
              </div>
              <div className="bg-warning bg-opacity-10 rounded p-3">
                <CIcon icon={cilChartPie} size="xl" className="text-warning" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6} lg={4}>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-6 fw-semibold text-body-secondary text-uppercase small">
                  Equipos Sin Asignar
                </div>
                <div className="fs-2 fw-semibold text-danger">
                  {equiposSinAsignar}
                </div>
              </div>
              <div className="bg-danger bg-opacity-10 rounded p-3">
                <CIcon icon={cilBan} size="xl" className="text-danger" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6} lg={4}>
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-6 fw-semibold text-body-secondary text-uppercase small">
                  Usuarios Libres
                </div>
                <div className="fs-2 fw-semibold text-secondary">
                  {usuariosLibres}
                </div>
              </div>
              <div className="bg-secondary bg-opacity-10 rounded p-3">
                <CIcon icon={cilPeople} size="xl" className="text-secondary" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Gráfica de Estados */}
      <CCol xs={12} lg={6}>
        <CCard className="h-100 border-0 shadow-sm">
          <CCardHeader style={{ backgroundColor: "#39f", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0))" }} className="border-0 shadow-sm text-white">
            <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
              <CIcon icon={cilChartPie} />
              Estado de los Equipos
            </CCardTitle>
          </CCardHeader>
          <CCardBody className="p-3">
            {Object.keys(equiposPorEstado).length > 0 ? (
              <CChartDoughnut
                data={chartDataEstados}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                  maintainAspectRatio: true,
                }}
              />
            ) : (
              <CAlert color="info">
                <strong>Sin datos.</strong> No hay equipos registrados para
                mostrar.
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Lista de Secretarías */}
      <CCol xs={12} lg={6}>
        <CCard className="h-100 border-0 shadow-sm">
          <CCardHeader style={{ backgroundColor: "#39f", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0))" }} className="border-0 shadow-sm text-white">
            <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
              <CIcon icon={cilBuilding} />
              Secretarías Registradas
            </CCardTitle>
          </CCardHeader>
          <CCardBody
            className="p-0"
            style={{ maxHeight: "430px", overflowY: "auto" }}
          >
            {secretarias.length > 0 ? (
              <CListGroup flush>
                {secretarias.map((secretaria, index) => (
                  <CListGroupItem
                    key={secretaria.ID}
                    className="d-flex justify-content-between align-items-center border-0 border-bottom py-3"
                  >
                    <div>
                      <div className="fw-bold text-dark">
                        {secretaria.Nombre}
                      </div>
                      <div className="text-body-secondary small">
                        {secretaria.Secretario || "Sin secretario asignado"}
                      </div>
                      {secretaria.Ubicacion && (
                        <div className="text-body-secondary small">
                          📍 {secretaria.Ubicacion}
                        </div>
                      )}
                    </div>
                    <CBadge
                      color="primary"
                      shape="rounded-pill"
                      className="fs-6"
                    >
                      {equiposPorSecretaria[secretaria.Nombre] || 0} equipos
                    </CBadge>
                  </CListGroupItem>
                ))}
              </CListGroup>
            ) : (
              <CAlert color="info" className="m-3">
                <strong>Sin secretarías.</strong> No hay secretarías
                registradas.
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Gráfica de Equipos por Secretaría */}
      <CCol xs={12}>
        <CCard className="border-0 shadow-sm">
          <CCardHeader style={{ backgroundColor: "#39f", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0))" }} className="border-0 shadow-sm text-white">
            <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
              <CIcon icon={cilDevices} />
              Distribución de Equipos por Secretaría
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            {Object.keys(equiposPorSecretaria).length > 0 ? (
              <div style={{ height: "200px" }}>
                <CChartBar
                  data={chartDataSecretarias}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            ) : (
              <CAlert color="info">
                <strong>Sin datos.</strong> No hay equipos registrados para
                mostrar.
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Gráfica de Tipos de Dispositivos */}
      <CCol xs={12}>
        <CCard className="border-0 shadow-sm">
          <CCardHeader style={{ backgroundColor: "#39f", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0))" }} className="border-0 shadow-sm text-white">
            <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
              <CIcon icon={cilChartPie} />
              Top 10 Tipos de Dispositivos
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            {Object.keys(equiposPorTipo).length > 0 ? (
              <div style={{ height: "200px" }}>
                <CChartLine
                  data={chartDataTipos}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            ) : (
              <CAlert color="info">
                <strong>Sin datos.</strong> No hay tipos de dispositivos para
                mostrar.
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Resumen por Estado */}
      <CCol xs={12}>
        <CCard className="border-0 shadow-sm">
          <CCardHeader style={{ backgroundColor: "#39f", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0))" }} className="border-0 shadow-sm text-white">
            <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
              <CIcon icon={cilInfo} />
              Resumen por Estado
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {Object.entries(equiposPorEstado).map(([estado, cantidad]) => {
                let color = "secondary";
                let icon = cilInfo;

                if (estado === "Activo" || estado === "Disponible") {
                  color = "success";
                  icon = cilCheckCircle;
                } else if (estado === "Inactivo") {
                  color = "danger";
                  icon = cilXCircle;
                } else if (estado === "En Mantenimiento") {
                  color = "warning";
                  icon = cilWarning;
                }

                return (
                  <CCol
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={estado}
                    className="mb-3"
                  >
                    <CCard className={`border-0 bg-${color} bg-opacity-10`}>
                      <CCardBody>
                        <div className="d-flex align-items-center gap-3">
                          <CIcon
                            icon={icon}
                            size="xl"
                            className={`text-${color}`}
                          />
                          <div>
                            <div className={`fs-5 fw-bold text-${color}`}>
                              {cantidad}
                            </div>
                            <div className="small text-body-secondary">
                              {estado}
                            </div>
                          </div>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                );
              })}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
