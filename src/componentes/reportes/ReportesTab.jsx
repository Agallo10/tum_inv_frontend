import React, { useState, useEffect, useRef } from "react";
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CFormCheck,
  CBadge,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CTooltip,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilPlus,
  cilTrash,
  cilSave,
  cilReload,
  cilSettings,
  cilClipboard,
  cilLocationPin,
  cilCloudDownload,
  cilCloudUpload,
  cilLockLocked,
  cilLockUnlocked,
} from "@coreui/icons";

import { useReporteStore } from "../../hook/reportes/useReporteStore";
import { AuthStore } from "../../store/auth/auth.store";
import { useNotificacion } from "../../hook";

const ReportesTab = ({ equipo }) => {
  const { ID } = equipo;
  const { crearReporte, cargarReportesByEquipos, descargarPdfReporte, subirFirmado, descargarFirmado, reabrirReporte } = useReporteStore();
  const user = AuthStore((state) => state.user);
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useNotificacion();
  const fileInputRef = useRef(null);
  const [reporteSubiendo, setReporteSubiendo] = useState(null);

  const uid = ID;
  const dependenciaNombre = localStorage.getItem("dependencia-nombre");
  const usuarioId = user?.ID || null;

  // Función para obtener fecha actual en formato ISO
  const getFechaActual = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const initialState = {
    creado_por_id: usuarioId,
    equipo_id: uid,
    dependencia: dependenciaNombre || "",
    ubicacion: "",
    diagnostico_falla: "",
    actividad_realizada: "",
    observaciones: "",
    fecha_inicio: getFechaActual(),
    fecha_finalizacion: "",
    tipo_mantenimiento: {
      tipo: "",
      revision: false,
      configuracion: false,
      instalacion: false,
      ingreso: false,
      salida: false,
      concepto_baja: false,
      otro: false,
      descripcion_otro: "",
    },
    repuestos: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [reportes, setReportes] = useState([]);

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

    if (Object.keys(validationErrors).length > 0) {
      mostrarAdvertencia("Por favor complete todos los campos requeridos", "Campos incompletos");
      return;
    }

    setEnviando(true);
    try {
      // Convertir fecha_utilizacion de repuestos a ISO
      const repuestosConFechaISO = formData.repuestos.map((repuesto) => ({
        ...repuesto,
        fecha_utilizacion: repuesto.fecha_utilizacion 
          ? new Date(repuesto.fecha_utilizacion).toISOString() 
          : new Date().toISOString(),
      }));

      const payload = {
        ...formData,
        fecha_inicio: new Date(formData.fecha_inicio).toISOString(),
        fecha_finalizacion: formData.fecha_finalizacion 
          ? new Date(formData.fecha_finalizacion).toISOString() 
          : new Date().toISOString(),
        repuestos: repuestosConFechaISO,
      };

      const resultado = await crearReporte(payload);

      if (resultado) {
        setFormData(initialState);
        setErrors({});
        cargarReportesEquipo();
        mostrarExito("El reporte de mantenimiento se creó correctamente", "¡Reporte creado!");
      } else {
        mostrarError("No se pudo crear el reporte. Por favor, intente nuevamente.", "Error al crear reporte");
      }
    } catch (error) {
      console.error("Error al crear reporte:", error);
      mostrarError("Ocurrió un error inesperado. Por favor, intente nuevamente.", "Error del servidor");
    } finally {
      setEnviando(false);
    }
  };

  // Cargar reportes del equipo
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
    cargarReportesEquipo();
  }, [uid]);

  // === Handler para subir PDF firmado ===
  const reporteParaSubirRef = useRef(null);

  const handleSubirFirmado = (reporteId) => {
    reporteParaSubirRef.current = reporteId;
    fileInputRef.current.value = '';
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const archivo = e.target.files[0];
    const reporteId = reporteParaSubirRef.current;
    if (!archivo || !reporteId) return;

    if (archivo.type !== 'application/pdf') {
      mostrarError('Solo se permiten archivos PDF');
      e.target.value = '';
      return;
    }

    setReporteSubiendo(reporteId);
    try {
      await subirFirmado(reporteId, archivo);
      mostrarExito('PDF firmado subido correctamente. El reporte ha sido cerrado.');
      await cargarReportesEquipo();
    } catch (error) {
      mostrarError(error || 'Error al subir el PDF firmado');
    } finally {
      e.target.value = '';
      setReporteSubiendo(null);
      reporteParaSubirRef.current = null;
    }
  };

  const handleDescargarFirmado = async (reporteId) => {
    try {
      await descargarFirmado(reporteId);
    } catch (error) {
      mostrarError(error || 'Error al descargar el PDF firmado');
    }
  };

  const handleReabrirReporte = async (reporteId) => {
    try {
      await reabrirReporte(reporteId);
      mostrarExito('Reporte reabierto. Puede subir un nuevo PDF firmado.');
      await cargarReportesEquipo();
    } catch (error) {
      mostrarError(error || 'Error al reabrir el reporte');
    }
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <CRow className="g-4">
        {/* Header */}
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bg-info bg-gradient border-0">
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
            <CCardHeader className="bborder-0 shadow-sm bg-info bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
                <CIcon icon={cilLocationPin} />
                Información del Reporte
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol lg={3}>
                  <CFormLabel>Dependencia</CFormLabel>
                  <CFormInput
                    value={formData.dependencia}
                    onChange={(e) =>
                      setFormData({ ...formData, dependencia: e.target.value })
                    }
                    placeholder="Ej: Secretaría de Educación"
                  />
                </CCol>
                <CCol lg={3}>
                  <CFormLabel>Ubicación</CFormLabel>
                  <CFormInput
                    value={formData.ubicacion}
                    onChange={(e) =>
                      setFormData({ ...formData, ubicacion: e.target.value })
                    }
                    placeholder="Ej: Oficina 301"
                  />
                </CCol>
                <CCol lg={3}>
                  <CFormLabel>Fecha de Inicio</CFormLabel>
                  <CFormInput
                    type="datetime-local"
                    value={formData.fecha_inicio}
                    onChange={(e) =>
                      setFormData({ ...formData, fecha_inicio: e.target.value })
                    }
                  />
                </CCol>
                <CCol lg={3}>
                  <CFormLabel>Fecha de Finalización</CFormLabel>
                  <CFormInput
                    type="datetime-local"
                    value={formData.fecha_finalizacion}
                    onChange={(e) =>
                      setFormData({ ...formData, fecha_finalizacion: e.target.value })
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
            <CCardHeader className="bborder-0 shadow-sm bg-info bg-gradient text-white">
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
                      id="preventivo"
                      label="PREVENTIVO"
                      checked={
                        formData.tipo_mantenimiento.tipo === "PREVENTIVO"
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tipo_mantenimiento: {
                            ...formData.tipo_mantenimiento,
                            tipo: e.target.checked ? "PREVENTIVO" : "",
                          },
                        })
                      }
                    />
                    <CFormCheck
                      id="correctivo"
                      label="CORRECTIVO"
                      checked={
                        formData.tipo_mantenimiento.tipo === "CORRECTIVO"
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tipo_mantenimiento: {
                            ...formData.tipo_mantenimiento,
                            tipo: e.target.checked ? "CORRECTIVO" : "",
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
                        {["instalacion", "ingreso", "salida", "concepto_baja"].map((actividad) => (
                          <CFormCheck
                            key={actividad}
                            id={actividad}
                            label={
                              actividad === "concepto_baja" 
                                ? "Concepto de baja"
                                : actividad.charAt(0).toUpperCase() + actividad.slice(1)
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
            <CCardHeader className="bg-info border-0 d-flex shadow-sm bg-gradient justify-content-between align-items-center">
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
                    capacidad: "",
                    descripcion: "",
                    fecha_utilizacion: getFechaActual(),
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
                        <CRow className="mb-3">
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
                              placeholder="Ej: DDR4"
                            />
                          </CCol>
                          <CCol lg={4}>
                            <CFormLabel>Capacidad</CFormLabel>
                            <CFormInput
                              value={repuesto.capacidad}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].capacidad =
                                  e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                              placeholder="Ej: 4GB"
                            />
                          </CCol>
                          <CCol lg={4}>
                            <CFormLabel>Descripción</CFormLabel>
                            <CFormInput
                              value={repuesto.descripcion}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].descripcion =
                                  e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
                              placeholder="Ej: Memoria RAM DDR4 4GB 2666MHz"
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-0">
                          <CCol lg={4}>
                            <CFormLabel>Fecha de Utilización</CFormLabel>
                            <CFormInput
                              type="datetime-local"
                              value={repuesto.fecha_utilizacion}
                              onChange={(e) => {
                                const nuevosRepuestos = [...formData.repuestos];
                                nuevosRepuestos[index].fecha_utilizacion =
                                  e.target.value;
                                setFormData({
                                  ...formData,
                                  repuestos: nuevosRepuestos,
                                });
                              }}
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

        {/* Botón de envío */}
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
           <CCardHeader className="bborder-0 shadow-sm bg-info bg-gradient text-white">
              <CCardTitle className="h6 mb-0 text-white">Acciones</CCardTitle>
            </CCardHeader>
            <CCardBody className="d-flex justify-content-center align-items-center py-4">
              <div className="text-center">
                <p className="text-body-secondary mb-3">
                  Complete todos los campos requeridos y haga clic en guardar.
                </p>
                <CButton
                  type="submit"
                  color="success"
                  size="lg"
                  disabled={enviando}
                  className="px-5"
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
           <CCardHeader className="bborder-0 shadow-sm bg-info bg-gradient text-white">
              <CCardTitle className="h5 mb-0 text-white d-flex align-items-center gap-2">
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
                      <CTableHeaderCell>ID</CTableHeaderCell>
                      <CTableHeaderCell>Creado Por</CTableHeaderCell>
                      <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                      <CTableHeaderCell>Fecha Fin</CTableHeaderCell>
                      <CTableHeaderCell>Tipo</CTableHeaderCell>
                      <CTableHeaderCell>Repuestos</CTableHeaderCell>
                      <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                      <CTableHeaderCell>Estado</CTableHeaderCell>
                      <CTableHeaderCell>Acciones</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {reportes.map((reporte) => (
                      <CTableRow key={reporte.id}>
                        <CTableDataCell>{reporte.id}</CTableDataCell>
                        <CTableDataCell>{reporte.creado_por_nombre}</CTableDataCell>
                        <CTableDataCell>{reporte.fecha_inicio}</CTableDataCell>
                        <CTableDataCell>{reporte.fecha_finalizacion}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={
                              reporte.tipo_mantenimiento === "PREVENTIVO"
                                ? "success"
                                : "warning"
                            }
                            shape="rounded-pill"
                          >
                            {reporte.tipo_mantenimiento || "N/A"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={reporte.repuestos === "Si" ? "info" : "secondary"}
                            shape="rounded-pill"
                          >
                            {reporte.repuestos}
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
                          {reporte.cerrado ? (
                            <CTooltip content={`Cerrado: ${reporte.fecha_cierre}`}>
                              <CBadge color="success" shape="rounded-pill">
                                <CIcon icon={cilLockLocked} size="sm" className="me-1" />
                                Cerrado
                              </CBadge>
                            </CTooltip>
                          ) : (
                            <CBadge color="warning" shape="rounded-pill">
                              <CIcon icon={cilLockUnlocked} size="sm" className="me-1" />
                              Abierto
                            </CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-1">
                            <CTooltip content="Descargar PDF">
                              <CButton
                                color="danger"
                                size="sm"
                                variant="ghost"
                                onClick={() => descargarPdfReporte(reporte.id, usuarioId)}
                              >
                                <CIcon icon={cilCloudDownload} />
                              </CButton>
                            </CTooltip>
                            {!reporte.cerrado ? (
                              <CTooltip content="Subir PDF firmado y cerrar reporte">
                                <CButton
                                  color="success"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleSubirFirmado(reporte.id)}
                                  disabled={reporteSubiendo === reporte.id}
                                >
                                  {reporteSubiendo === reporte.id ? (
                                    <CSpinner size="sm" />
                                  ) : (
                                    <CIcon icon={cilCloudUpload} />
                                  )}
                                </CButton>
                              </CTooltip>
                            ) : (
                              <>
                                <CTooltip content="Descargar PDF firmado">
                                  <CButton
                                    color="info"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDescargarFirmado(reporte.id)}
                                  >
                                    <CIcon icon={cilLockLocked} />
                                  </CButton>
                                </CTooltip>
                                <CTooltip content="Reabrir reporte (permite subir otro PDF)">
                                  <CButton
                                    color="warning"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleReabrirReporte(reporte.id)}
                                  >
                                    <CIcon icon={cilReload} />
                                  </CButton>
                                </CTooltip>
                              </>
                            )}
                          </div>
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

      {/* Input oculto para subir PDF firmado */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="application/pdf"
        onChange={handleFileChange}
      />
    </CForm>
  );
};

export default ReportesTab;
