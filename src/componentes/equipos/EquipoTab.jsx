import React, { useState, useEffect } from "react";
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CFormSelect,
  CButton,
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react-pro";

import {
  getFechaActual,
  construirPayloadEquipo,
  validarFormularioEquipo,
  opcionesTipoEquipo,
} from "./helpers";

import { useEquipoStore } from "../../hook/equipos/useEquipoStore";
import EquiposTable from "./EquiposTable";
import { useUsuarioResponsableStore } from "../../hook/ususariosresponsables/useUsuarioResponsableStore";
import { useNotificacion } from "../../hook";
import { useSecretariaStore } from "../../hook/secretarias/useSecretariaStore";
import { useDependenciaStore } from "../../hook/dependencias/useDependenciaStore";
import ModalAsignarResponsable from "../sinasignar/ModalAsignarResponsable";

const EquipoTab = () => {
  const { crearEquipo, cargarEquiposByDependencia, cargarEstadosEquipo, asignarResponsable, actualizarEquipo, eliminarEquipo } =
    useEquipoStore();
  const { cargarUsuariosResponsablesByDependencia } =
    useUsuarioResponsableStore();
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useNotificacion();
  const { cargarSecretarias } = useSecretariaStore();
  const { cargarDependenciasBySecretariaUid } = useDependenciaStore();
  const uid = localStorage.getItem("dependencia-id");
  const fechaHoy = getFechaActual();

  //   const initialState = {
  //     fecha: fechaHoy,
  //     lote: "",
  //     variedad: "",
  //     patron: "",
  //     proveedorMaterial: "",
  //     numeroPlantulas: "",
  //     siembraNueva: "",
  //     resiembra: "",
  //     distanciaCalle: "",
  //     distanciaPlanta: "",
  //     operario: "",
  //   };

  const initialState = {
    FechaDiligenciamiento: fechaHoy,
    TipoDispositivo: "",
    PlacaInventario: "",
    Marca: "",
    Serial: "",
    Modelo: "",
    ObservacionesGenerales: "",
    EstadoEquipoID: "",
    UsuarioResponsableID: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [editandoEquipo, setEditandoEquipo] = useState(null);
  const [equipos, setEquipos] = useState([]);
  const [opcionesUsuarios, setOpcionesUsuarios] = useState([]);
  const [opcionesEstados, setOpcionesEstados] = useState([]);

  // Reasignar equipo state
  const [modalReasignarVisible, setModalReasignarVisible] = useState(false);
  const [equipoReasignar, setEquipoReasignar] = useState(null);
  const [secretariasResp, setSecretariasResp] = useState([]);
  const [dependenciasResp, setDependenciasResp] = useState([]);
  const [usuariosResp, setUsuariosResp] = useState([]);
  const [loadingReasignar, setLoadingReasignar] = useState(false);

  // Eliminar equipo state
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [equipoEliminar, setEquipoEliminar] = useState(null);
  const [loadingEliminar, setLoadingEliminar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormularioEquipo(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      mostrarAdvertencia("Por favor complete todos los campos requeridos", "Campos incompletos");
      return;
    }

    setEnviando(true);
    try {
      if (editandoEquipo) {
        // Modo edición
        const payload = construirPayloadEquipo(formData, uid, fechaHoy);
        await actualizarEquipo(editandoEquipo.ID, payload);
        mostrarExito("El equipo se actualizó correctamente", "¡Equipo actualizado!");
        setEditandoEquipo(null);
      } else {
        // Modo creación
        const payload = construirPayloadEquipo(formData, uid, fechaHoy);
        const resultado = await crearEquipo(payload);
        if (resultado) {
          mostrarExito("El equipo se creó correctamente", "¡Equipo creado!");
        } else {
          mostrarError("No se pudo crear el equipo. Por favor, intente nuevamente.", "Error al crear equipo");
        }
      }
      resetFormData();
      cargarEquipos();
    } catch (error) {
      console.error("Error:", error);
      mostrarError(error || "Ocurrió un error inesperado. Por favor, intente nuevamente.", "Error del servidor");
    } finally {
      setEnviando(false);
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
    setEditandoEquipo(null);
  };

  // Manejar edición de equipo
  const handleEditar = (equipo) => {
    setEditandoEquipo(equipo);
    setFormData({
      FechaDiligenciamiento: fechaHoy,
      TipoDispositivo: equipo.TipoDispositivo || "",
      PlacaInventario: equipo.PlacaInventario || "",
      Marca: equipo.Marca || "",
      Serial: equipo.Serial || "",
      Modelo: equipo.Modelo || "",
      ObservacionesGenerales: equipo.ObservacionesGenerales || "",
      UsuarioResponsableID: equipo.UsuarioResponsableID || "",
      EstadoEquipoID: equipo.EstadoEquipoID || "",
    });
    // Scroll hacia el formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSubmitDisabled =
    enviando ||
    !formData.Marca ||
    !formData.Modelo ||
    !formData.PlacaInventario;
  // ||
  // !!errors.numeroPlantulas ||
  // !!errors;

  const cargarEquipos = async () => {
    const equipos = await cargarEquiposByDependencia(uid);
    // console.log(equipos);
    setEquipos(equipos);
  };

  const cargarUsuariosResponsables = async () => {
    const usuariosResponsables =
      await cargarUsuariosResponsablesByDependencia(uid);

    const usuariosResponsablesMap = usuariosResponsables.map((u) => {
      //console.log(u.ID);
      return { value: u.ID, label: u.NombresApellidos };
    });

    const opcionesUsuarios = [
      { value: "", label: "Seleccione" },
      ...usuariosResponsablesMap,
    ];

    setOpcionesUsuarios(opcionesUsuarios);
  };
  const cargarEstados = async () => {
    const estados = await cargarEstadosEquipo();

    const estadosMap = estados.map((e) => {
      //console.log(e.ID);
      return { value: e.ID, label: e.Nombre };
    });

    const opcionesEstados = [{ value: "", label: "Seleccione" }, ...estadosMap];

    setOpcionesEstados(opcionesEstados);
  };

  // === Handlers para reasignar equipo ===
  const handleAbrirReasignar = async (equipo) => {
    setEquipoReasignar(equipo);
    setDependenciasResp([]);
    setUsuariosResp([]);
    try {
      const datos = await cargarSecretarias();
      setSecretariasResp(datos || []);
    } catch {
      setSecretariasResp([]);
    }
    setModalReasignarVisible(true);
  };

  const handleSecretariaChangeResp = async (secretariaId) => {
    setUsuariosResp([]);
    try {
      const datos = await cargarDependenciasBySecretariaUid(secretariaId);
      setDependenciasResp(datos || []);
    } catch {
      setDependenciasResp([]);
    }
  };

  const handleDependenciaChangeResp = async (dependenciaId) => {
    try {
      const datos = await cargarUsuariosResponsablesByDependencia(dependenciaId);
      setUsuariosResp(datos || []);
    } catch {
      setUsuariosResp([]);
    }
  };

  const handleGuardarReasignar = async (usuarioResponsableId) => {
    setLoadingReasignar(true);
    try {
      await asignarResponsable(equipoReasignar.ID, usuarioResponsableId);
      mostrarExito("Equipo reasignado correctamente");
      setModalReasignarVisible(false);
      cargarEquipos(); // recargar la tabla
    } catch (error) {
      mostrarError(error || "Error al reasignar equipo");
    } finally {
      setLoadingReasignar(false);
    }
  };

  // === Handlers para eliminar equipo ===
  const handleEliminar = (equipo) => {
    setEquipoEliminar(equipo);
    setModalEliminarVisible(true);
  };

  const handleConfirmarEliminar = async () => {
    if (!equipoEliminar) return;
    const idEliminar = equipoEliminar.ID;
    setLoadingEliminar(true);
    try {
      await eliminarEquipo(idEliminar);
      // Cerrar modal y limpiar estado
      setModalEliminarVisible(false);
      setEquipoEliminar(null);
      // Quitar de la lista local inmediatamente
      setEquipos((prev) => prev.filter((e) => e.ID !== idEliminar));
      mostrarExito("Equipo eliminado correctamente. Sus periféricos quedaron libres.");
    } catch (error) {
      mostrarError(error || "Error al eliminar equipo");
    } finally {
      setLoadingEliminar(false);
    }
  };

  useEffect(() => {
    if (!uid) return;
    // cargaSiembras();
    cargarEquipos();
    cargarUsuariosResponsables();
    cargarEstados();
    console.log("isSubmitDisabled:", isSubmitDisabled);
    console.log("enviando:", enviando);
  }, [uid]);

  return (
    <CForm className="p-1" onSubmit={handleSubmit}>
      <CRow className="mb-4">
        {/* 🟩 Columna 1 */}
        <CCol md={6}>
          <div className="p-3 border rounded shadow-sm h-100">
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Modelo</CFormLabel>
                <CFormInput
                  value={formData.Modelo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Modelo: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Marca</CFormLabel>
                <CFormInput
                  value={formData.Marca}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Marca: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CFormLabel>Tipo de dispositivo</CFormLabel>
                <CFormSelect
                  value={formData.TipoDispositivo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      TipoDispositivo: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una tipo</option>
                  {opcionesTipoEquipo[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol>
                <CFormLabel>Estado del Equipo</CFormLabel>
                <CFormSelect
                  value={formData.EstadoEquipoID}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      EstadoEquipoID: e.target.value,
                    })
                  }
                  invalid={!!errors.EstadoEquipoID}
                >
                  {opcionesEstados.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>{errors.EstadoEquipoID}</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Serial</CFormLabel>
                <CFormInput
                  value={formData.Serial}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Serial: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Placa Inventario</CFormLabel>
                <CFormInput
                  value={formData.PlacaInventario}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      PlacaInventario: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>
          </div>
        </CCol>

        {/* 🟦 Columna 2 */}
        <CCol md={6}>
          <div className="p-3 border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Observaciones</CFormLabel>
                <CFormTextarea
                  rows={2}
                  value={formData.ObservacionesGenerales}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ObservacionesGenerales: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="align-items-end">
              <CCol>
                <CFormLabel>Usuario Responsable</CFormLabel>
                <CFormSelect
                  value={formData.UsuarioResponsableID}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      UsuarioResponsableID: e.target.value,
                    })
                  }
                  invalid={!!errors.UsuarioResponsableID}
                >
                  {opcionesUsuarios.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>
                  {errors.UsuarioResponsableID}
                </CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol className="d-flex justify-content-end gap-2">
                {editandoEquipo && (
                  <CButton
                    type="button"
                    color="secondary"
                    onClick={resetFormData}
                  >
                    Cancelar
                  </CButton>
                )}
                <CButton
                  type="submit"
                  color={editandoEquipo ? "primary" : "success"}
                  disabled={isSubmitDisabled}
                >
                  {enviando
                    ? "Guardando..."
                    : editandoEquipo
                      ? "Actualizar Equipo"
                      : "Guardar Equipo"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <EquiposTable equipos={equipos} pages={5} onReasignar={handleAbrirReasignar} onEditar={handleEditar} onEliminar={handleEliminar} />
        </CCol>
      </CRow>

      {/* Modal para reasignar equipo */}
      <ModalAsignarResponsable
        visible={modalReasignarVisible}
        onClose={() => setModalReasignarVisible(false)}
        onSave={handleGuardarReasignar}
        equipo={equipoReasignar}
        secretarias={secretariasResp}
        dependenciasPorSecretaria={dependenciasResp}
        usuariosPorDependencia={usuariosResp}
        onSecretariaChange={handleSecretariaChangeResp}
        onDependenciaChange={handleDependenciaChangeResp}
        loading={loadingReasignar}
      />

      {/* Modal de confirmación para eliminar equipo */}
      <CModal
        visible={modalEliminarVisible}
        onClose={() => setModalEliminarVisible(false)}
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {equipoEliminar && (
            <>
              <p>¿Está seguro de que desea eliminar este equipo?</p>
              <div className="p-3 bg-body-secondary rounded">
                <strong>Tipo:</strong> {equipoEliminar.TipoDispositivo}<br />
                <strong>Marca:</strong> {equipoEliminar.Marca} {equipoEliminar.Modelo}<br />
                <strong>Serial:</strong> {equipoEliminar.Serial}
                {equipoEliminar.PlacaInventario && (
                  <><br /><strong>Placa:</strong> {equipoEliminar.PlacaInventario}</>
                )}
              </div>
              <p className="mt-3 text-warning">
                <strong>Nota:</strong> Los periféricos asociados a este equipo quedarán
                libres y podrán ser reasignados desde la sección "Sin equipo asignado".
              </p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            variant="ghost"
            onClick={() => setModalEliminarVisible(false)}
            disabled={loadingEliminar}
          >
            Cancelar
          </CButton>
          <CButton
            color="danger"
            onClick={handleConfirmarEliminar}
            disabled={loadingEliminar}
          >
            {loadingEliminar ? "Eliminando..." : "Eliminar"}
          </CButton>
        </CModalFooter>
      </CModal>
    </CForm>
  );
};

export default EquipoTab;
