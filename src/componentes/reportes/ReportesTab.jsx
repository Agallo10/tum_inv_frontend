import React, { useState, useEffect } from "react";
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CFormCheck,
  CBadge,
  CAlert,
  CMultiSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilPlus,
  cilTrash,
  cilSave,
  cilReload,
  cilUser,
  cilSettings,
  cilClipboard,
  cilLocationPin,
} from "@coreui/icons";

import { useReporteStore } from "../../hook/reportes/useReporteStore";
import { useUsuarioResponsableStore } from "../../hook/ususariosresponsables/useUsuarioResponsableStore";

const ReportesTab = ({ equipo }) => {
  const { ID } = equipo;
  const { crearReporte, cargarReportesByEquipos } = useReporteStore();
  const { cargarUsuariosResponsablesByDependencia } =
    useUsuarioResponsableStore();

  const uid = ID;
  const dependenciaId = localStorage.getItem("dependencia-id");
  const dependenciaNombre = localStorage.getItem("dependencia-nombre");

  // Función para obtener fecha actual en formato ISO
  const getFechaActual = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const initialState = {
    equipo_id: uid,
    dependencia: dependenciaNombre || "",
    ubicacion: "",
    diagnostico_falla: "",
    actividad_realizada: "",
    observaciones: "",
    fecha_inicio: getFechaActual(),
    tipo_mantenimiento: {
      tipo: "PREVENTIVO",
      revision: false,
      configuracion: false,
      instalacion: false,
      ingreso: false,
      otro: false,
      descripcion_otro: "",
    },
    repuestos: [],
    funcionario_ids: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  // Validación del formulario
  const validarFormulario = (data) => {
    const newErrors = {};

    if (!data.dependencia.trim()) {
      newErrors.dependencia = "La dependencia es requerida";
    }

    if (!data.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es requerida";
    }

    if (!data.diagnostico_falla.trim()) {
      newErrors.diagnostico_falla = "El diagnóstico de falla es requerido";
    }

    if (!data.actividad_realizada.trim()) {
      newErrors.actividad_realizada = "La actividad realizada es requerida";
    }

    if (!data.fecha_inicio) {
      newErrors.fecha_inicio = "La fecha de inicio es requerida";
    }

    const actividades = data.tipo_mantenimiento;
    if (
      !actividades.revision &&
      !actividades.configuracion &&
      !actividades.instalacion &&
      !actividades.ingreso &&
      !actividades.otro
    ) {
      newErrors.tipo_mantenimiento =
        "Debe seleccionar al menos una actividad de mantenimiento";
    }

    if (actividades.otro && !actividades.descripcion_otro.trim()) {
      newErrors.descripcion_otro = "Debe describir la otra actividad";
    }

    return newErrors;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validarFormulario(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      try {
        const payload = {
          ...formData,
          fecha_inicio: new Date(formData.fecha_inicio).toISOString(),
        };

        const resultado = await crearReporte(payload);

        if (resultado) {
          setFormData(initialState);
          setErrors({});
          cargarReportesEquipo();
          console.log("Reporte creado exitosamente");
        }
      } catch (error) {
        console.error("Error al crear reporte:", error);
      } finally {
        setEnviando(false);
      }
    }
  };

  // Cargar funcionarios y reportes
  const cargarFuncionarios = async () => {
    if (dependenciaId) {
      try {
        const funcionariosData =
          await cargarUsuariosResponsablesByDependencia(dependenciaId);
        setFuncionarios(funcionariosData || []);
      } catch (error) {
        console.error("Error al cargar funcionarios:", error);
        setFuncionarios([]);
      }
    }
  };

  const cargarReportesEquipo = async () => {
    try {
      const reportesData = await cargarReportesByEquipos(uid);
      setReportes(reportesData || []);
    } catch (error) {
      console.error("Error al cargar reportes:", error);
      setReportes([]);
    }
  };

  useEffect(() => {
    cargarFuncionarios();
    cargarReportesEquipo();
  }, [uid, dependenciaId]);

  return (
    <CForm onSubmit={handleSubmit}>
      <CRow className="g-4">
        {/* Header */}
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bg-primary bg-gradient border-0">
              <CCardTitle className="mb-0 h5 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilClipboard} />
                Crear Reporte de Mantenimiento
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <p className="text-body-secondary mb-0">
                Complete el formulario para generar un nuevo reporte de
                mantenimiento para el equipo.
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Información General */}
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilLocationPin} />
                Información del Reporte
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol lg={4}>
                  <CFormLabel>Dependencia</CFormLabel>
                  <CFormInput
                    value={formData.dependencia}
                    onChange={(e) =>
                      setFormData({ ...formData, dependencia: e.target.value })
                    }
                    placeholder="Ej: Secretaría de la mujer"
                  />
                </CCol>
                <CCol lg={4}>
                  <CFormLabel>Ubicación</CFormLabel>
                  <CFormInput
                    value={formData.ubicacion}
                    onChange={(e) =>
                      setFormData({ ...formData, ubicacion: e.target.value })
                    }
                    placeholder="Ej: Parque nariño"
                  />
                </CCol>
                <CCol lg={4}>
                  <CFormLabel>Fecha de Inicio</CFormLabel>
                  <CFormInput
                    type="datetime-local"
                    value={formData.fecha_inicio}
                    onChange={(e) =>
                      setFormData({ ...formData, fecha_inicio: e.target.value })
                    }
                  />
                </CCol>
              </CRow>

              <CRow className="mb-0">
                <CCol lg={6}>
                  <CFormLabel>Diagnóstico de Falla</CFormLabel>
                  <CFormTextarea
                    rows={4}
                    value={formData.diagnostico_falla}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        diagnostico_falla: e.target.value,
                      })
                    }
                    placeholder="Describa el problema encontrado..."
                  />
                </CCol>
                <CCol lg={6}>
                  <CFormLabel>Actividad Realizada</CFormLabel>
                  <CFormTextarea
                    rows={4}
                    value={formData.actividad_realizada}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        actividad_realizada: e.target.value,
                      })
                    }
                    placeholder="Describa las acciones realizadas..."
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Observaciones y Tipo de Mantenimiento */}
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilSettings} />
                Tipo de Mantenimiento y Observaciones
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              {/* Observaciones primero */}
              <CRow className="mb-4">
                <CCol xs={12}>
                  <CFormLabel>Observaciones Adicionales</CFormLabel>
                  <CFormTextarea
                    rows={3}
                    value={formData.observaciones}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        observaciones: e.target.value,
                      })
                    }
                    placeholder="Ingrese observaciones adicionales sobre el mantenimiento realizado..."
                  />
                </CCol>
              </CRow>

              {/* Tipo de mantenimiento */}
              <CRow className="mb-0">
                <CCol lg={3}>
                  <CFormLabel className="fw-bold mb-3">
                    Tipo de Mantenimiento
                  </CFormLabel>
                  <div className="d-flex flex-column gap-2">
                    <CFormCheck
                      type="radio"
                      name="tipoMantenimiento"
                      id="preventivo"
                      label="PREVENTIVO"
                      checked={
                        formData.tipo_mantenimiento.tipo === "PREVENTIVO"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          tipo_mantenimiento: {
                            ...formData.tipo_mantenimiento,
                            tipo: "PREVENTIVO",
                          },
                        })
                      }
                    />
                    <CFormCheck
                      type="radio"
                      name="tipoMantenimiento"
                      id="correctivo"
                      label="CORRECTIVO"
                      checked={
                        formData.tipo_mantenimiento.tipo === "CORRECTIVO"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          tipo_mantenimiento: {
                            ...formData.tipo_mantenimiento,
                            tipo: "CORRECTIVO",
                          },
                        })
                      }
                    />
                  </div>
                </CCol>

                <CCol lg={9}>
                  <CFormLabel className="fw-bold mb-3">
                    Actividades Realizadas
                  </CFormLabel>
                  <CRow>
                    <CCol md={4}>
                      <div className="d-flex flex-column gap-2">
                        {["revision", "configuracion"].map((actividad) => (
                          <CFormCheck
                            key={actividad}
                            id={actividad}
                            label={
                              actividad.charAt(0).toUpperCase() +
                              actividad.slice(1)
                            }
                            checked={formData.tipo_mantenimiento[actividad]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                tipo_mantenimiento: {
                                  ...formData.tipo_mantenimiento,
                                  [actividad]: e.target.checked,
                                },
                              })
                            }
                          />
                        ))}
                      </div>
                    </CCol>
                    <CCol md={4}>
                      <div className="d-flex flex-column gap-2">
                        {["instalacion", "ingreso"].map((actividad) => (
                          <CFormCheck
                            key={actividad}
                            id={actividad}
                            label={
                              actividad.charAt(0).toUpperCase() +
                              actividad.slice(1)
                            }
                            checked={formData.tipo_mantenimiento[actividad]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                tipo_mantenimiento: {
                                  ...formData.tipo_mantenimiento,
                                  [actividad]: e.target.checked,
                                },
                              })
                            }
                          />
                        ))}
                      </div>
                    </CCol>
                    <CCol md={4}>
                      <div className="d-flex flex-column gap-2">
                        <CFormCheck
                          id="otro"
                          label="Otro"
                          checked={formData.tipo_mantenimiento.otro}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tipo_mantenimiento: {
                                ...formData.tipo_mantenimiento,
                                otro: e.target.checked,
                              },
                            })
                          }
                        />
                        {formData.tipo_mantenimiento.otro && (
                          <CFormInput
                            className="mt-1"
                            placeholder="Describa la otra actividad..."
                            value={formData.tipo_mantenimiento.descripcion_otro}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                tipo_mantenimiento: {
                                  ...formData.tipo_mantenimiento,
                                  descripcion_otro: e.target.value,
                                },
                              })
                            }
                          />
                        )}
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Repuestos */}
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bg-primary border-0 d-flex shadow-sm bg-gradient justify-content-between align-items-center">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilSettings} />
                Repuestos Utilizados
              </CCardTitle>
              <CButton
                color="success"
                size="sm"
                onClick={() => {
                  const nuevoRepuesto = {
                    cantidad: 1,
                    serial_numero_parte: "",
                    marca: "",
                    tecnologia: "",
                    Capacidad: "",
                    Descripcion: "",
                  };
                  setFormData({
                    ...formData,
                    repuestos: [...formData.repuestos, nuevoRepuesto],
                  });
                }}
              >
                <CIcon icon={cilPlus} className="me-1" />
                Agregar Repuesto
              </CButton>
            </CCardHeader>
            <CCardBody>
              {formData.repuestos.length === 0 ? (
                <CAlert color="info" className="mb-0">
                  <strong>Sin repuestos agregados.</strong> Haga clic en
                  "Agregar Repuesto" para incluir repuestos utilizados en el
                  mantenimiento.
                </CAlert>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {formData.repuestos.map((repuesto, index) => (
                    <CCard key={index} className="border">
                      <CCardHeader className="bg-light py-2 d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Repuesto #{index + 1}</span>
                        <CButton
                          color="danger"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const nuevosRepuestos = formData.repuestos.filter(
                              (_, i) => i !== index
                            );
                            setFormData({
                              ...formData,
                              repuestos: nuevosRepuestos,
                            });
                          }}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CCardHeader>
                      <CCardBody>
                        <CRow className="mb-3">
                          <CCol lg={2} md={3}>
                            <CFormLabel>Cantidad</CFormLabel>
                            <CFormInput
                              type="number"
                              min="1"
                              value={repuesto.cantidad}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].cantidad =
                                  parseInt(e.target.value) || 1;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                            />
                          </CCol>
                          <CCol lg={5} md={9}>
                            <CFormLabel>Serial/Número de Parte</CFormLabel>
                            <CFormInput
                              value={repuesto.serial_numero_parte}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].serial_numero_parte =
                                  e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                              placeholder="Ej: 121212"
                            />
                          </CCol>
                          <CCol lg={5} md={12}>
                            <CFormLabel>Marca</CFormLabel>
                            <CFormInput
                              value={repuesto.marca}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].marca = e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                              placeholder="Ej: Lenovo"
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-0">
                          <CCol lg={4}>
                            <CFormLabel>Tecnología</CFormLabel>
                            <CFormInput
                              value={repuesto.tecnologia}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].tecnologia =
                                  e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                              placeholder="Ej: ddr4"
                            />
                          </CCol>
                          <CCol lg={4}>
                            <CFormLabel>Capacidad</CFormLabel>
                            <CFormInput
                              value={repuesto.Capacidad}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].Capacidad =
                                  e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                              placeholder="Ej: 10gb"
                            />
                          </CCol>
                          <CCol lg={4}>
                            <CFormLabel>Descripción</CFormLabel>
                            <CFormInput
                              value={repuesto.Descripcion}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].Descripcion =
                                  e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                              placeholder="Ej: memoria ram"
                            />
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  ))}
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        {/* Funcionarios y Botón de envío */}
        <CCol lg={8}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bborder-0 shadow-sm bg-primary bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilUser} />
                Funcionarios Asignados
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CFormLabel>Seleccionar Funcionarios</CFormLabel>
              <CMultiSelect
                value={formData.funcionario_ids}
                onChange={(selected) =>
                  setFormData({ ...formData, funcionario_ids: selected })
                }
                options={funcionarios.map((funcionario) => ({
                  value: funcionario.ID,
                  label: `${funcionario.NombresApellidos} - ${funcionario.Cedula}`,
                }))}
                placeholder="Seleccione los funcionarios que participaron en el mantenimiento"
                text="funcionarios seleccionados"
              />
              {formData.funcionario_ids.length > 0 && (
                <div className="mt-3">
                  <strong>Funcionarios seleccionados:</strong>
                  <div className="d-flex gap-2 flex-wrap mt-2">
                    {formData.funcionario_ids.map((id) => {
                      const funcionario = funcionarios.find((f) => f.ID === id);
                      return funcionario ? (
                        <CBadge key={id} color="primary" shape="rounded-pill">
                          {funcionario.NombresApellidos}
                        </CBadge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard className="h-100 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <CCardTitle className="h6 mb-0 text-primary">Acciones</CCardTitle>
            </CCardHeader>
            <CCardBody className="d-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                <p className="text-body-secondary mb-3">
                  Complete todos los campos requeridos y haga clic en guardar.
                </p>
                <CButton
                  type="submit"
                  color="success"
                  size="lg"
                  disabled={enviando}
                  className="px-4 w-100"
                >
                  {enviando ? (
                    <>
                      <CIcon icon={cilReload} className="me-2" spin />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <CIcon icon={cilSave} className="me-2" />
                      Guardar Reporte
                    </>
                  )}
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Tabla de reportes existentes */}
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <CCardTitle className="h6 mb-0 text-primary d-flex align-items-center gap-2">
                <CIcon icon={cilClipboard} />
                Reportes Existentes del Equipo
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              {reportes.length === 0 ? (
                <CAlert color="info" className="mb-0">
                  <strong>Sin reportes registrados.</strong> Este equipo aún no
                  tiene reportes de mantenimiento registrados.
                </CAlert>
              ) : (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Fecha</CTableHeaderCell>
                      <CTableHeaderCell>Dependencia</CTableHeaderCell>
                      <CTableHeaderCell>Ubicación</CTableHeaderCell>
                      <CTableHeaderCell>Tipo</CTableHeaderCell>
                      <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                      <CTableHeaderCell>Actividad</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {reportes.map((reporte) => (
                      <CTableRow key={reporte.id || Math.random()}>
                        <CTableDataCell>
                          {new Date(reporte.fecha_inicio).toLocaleDateString()}
                        </CTableDataCell>
                        <CTableDataCell>{reporte.dependencia}</CTableDataCell>
                        <CTableDataCell>{reporte.ubicacion}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={
                              reporte.tipo_mantenimiento?.tipo === "PREVENTIVO"
                                ? "success"
                                : "warning"
                            }
                            shape="rounded-pill"
                          >
                            {reporte.tipo_mantenimiento?.tipo || "N/A"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span
                            className="text-truncate d-inline-block"
                            style={{ maxWidth: "200px" }}
                          >
                            {reporte.diagnostico_falla}
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span
                            className="text-truncate d-inline-block"
                            style={{ maxWidth: "200px" }}
                          >
                            {reporte.actividad_realizada}
                          </span>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ReportesTab;
