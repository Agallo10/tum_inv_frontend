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
} from "@coreui/react-pro";

import {
  construirPayloadUsuario,
  opcionesTipoVinculacion,
  validarFormularioUsuarios,
} from "./helpers";

import { useUsuarioResponsableStore } from "../../hook/ususariosresponsables/useUsuarioResponsableStore";
import UsuariosResTable from "./UsuariosResTable";
import { useNotificacion } from "../../hook";
import { useSecretariaStore } from "../../hook/secretarias/useSecretariaStore";
import { useDependenciaStore } from "../../hook/dependencias/useDependenciaStore";
import ModalAsignarDependencia from "../sinasignar/ModalAsignarDependencia";

const UsuariosResTab = () => {
  const { cargarUsuariosResponsablesByDependencia, crearUsuarioResponsable, actualizarUsuarioResponsable, asignarDependencia } =
    useUsuarioResponsableStore();
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useNotificacion();
  const { cargarSecretarias } = useSecretariaStore();
  const { cargarDependenciasBySecretariaUid } = useDependenciaStore();
  const uid = localStorage.getItem("dependencia-id");

  const initialState = {
    NombresApellidos: "",
    Cedula: "",
    CorreoPersonal: "",
    TipoVinculacion: "",
    Celular: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  // Reasignar usuario state
  const [modalReasignarVisible, setModalReasignarVisible] = useState(false);
  const [usuarioReasignar, setUsuarioReasignar] = useState(null);
  const [secretariasResp, setSecretariasResp] = useState([]);
  const [dependenciasResp, setDependenciasResp] = useState([]);
  const [loadingReasignar, setLoadingReasignar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormularioUsuarios(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      mostrarAdvertencia("Por favor complete todos los campos requeridos", "Campos incompletos");
      return;
    }

    setEnviando(true);
    try {
      if (editandoUsuario) {
        // Modo edición
        const payload = construirPayloadUsuario(formData, uid);
        await actualizarUsuarioResponsable(editandoUsuario.ID, payload);
        mostrarExito("El usuario se actualizó correctamente", "¡Usuario actualizado!");
        setEditandoUsuario(null);
      } else {
        // Modo creación
        const payload = construirPayloadUsuario(formData, uid);
        await crearUsuarioResponsable(payload);
        mostrarExito("El usuario se creó correctamente", "¡Usuario creado!");
      }
      resetFormData();
      cargarUsuariosResponsables();
    } catch (error) {
      console.error("Error:", error);
      mostrarError(error || "Ocurrió un error inesperado.", "Error del servidor");
    } finally {
      setEnviando(false);
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
    setEditandoUsuario(null);
  };

  // Manejar edición de usuario
  const handleEditar = (usuario) => {
    setEditandoUsuario(usuario);
    setFormData({
      NombresApellidos: usuario.NombresApellidos || "",
      Cedula: usuario.Cedula || "",
      CorreoPersonal: usuario.CorreoPersonal || "",
      TipoVinculacion: usuario.TipoVinculacion || "",
      Celular: usuario.Celular || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // === Handlers para reasignar usuario ===
  const handleAbrirReasignar = async (usuario) => {
    setUsuarioReasignar(usuario);
    setDependenciasResp([]);
    try {
      const datos = await cargarSecretarias();
      setSecretariasResp(datos || []);
    } catch {
      setSecretariasResp([]);
    }
    setModalReasignarVisible(true);
  };

  const handleSecretariaChangeResp = async (secretariaId) => {
    try {
      const datos = await cargarDependenciasBySecretariaUid(secretariaId);
      setDependenciasResp(datos || []);
    } catch {
      setDependenciasResp([]);
    }
  };

  const handleGuardarReasignar = async (dependenciaId) => {
    setLoadingReasignar(true);
    try {
      await asignarDependencia(usuarioReasignar.ID, dependenciaId);
      mostrarExito("Usuario reasignado correctamente");
      setModalReasignarVisible(false);
      cargarUsuariosResponsables();
    } catch (error) {
      mostrarError(error || "Error al reasignar usuario");
    } finally {
      setLoadingReasignar(false);
    }
  };

  const isSubmitDisabled =
    enviando ||
    !formData.NombresApellidos ||
    !formData.Cedula ||
    !formData.CorreoPersonal;
  // ||
  // !!errors.TipoVinculacion ||
  // !!errors.operario;

  const cargarUsuariosResponsables = async () => {
    const usuariosResponsables =
      await cargarUsuariosResponsablesByDependencia(uid);
    setUsuarios(usuariosResponsables);
  };

  useEffect(() => {
    if (!uid) return;
    cargarUsuariosResponsables();
  }, [uid]);

  return (
    <CForm className="p-1" onSubmit={handleSubmit}>
      <CRow className="mb-4">
        {/* 🟩 Columna 1 */}
        <CCol md={12}>
          <div className="p-3 border rounded shadow-sm h-100">
            <CRow className="mb-3">
              {/* <CCol>
                <CFormLabel>Fecha</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fecha}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                  }
                />
              </CCol> */}
              <CCol>
                <CFormLabel>Nombre Completo</CFormLabel>
                <CFormInput
                  value={formData.NombresApellidos}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      NombresApellidos: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CFormLabel>Tipo de vinculacion</CFormLabel>
                <CFormSelect
                  value={formData.TipoVinculacion}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      TipoVinculacion: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una tipo de vinculacion</option>
                  {opcionesTipoVinculacion[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Cedula</CFormLabel>
                <CFormInput
                  value={formData.Cedula}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Cedula: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Correo Personal</CFormLabel>
                <CFormInput
                  value={formData.CorreoPersonal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      CorreoPersonal: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Celular</CFormLabel>
                <CFormInput
                  value={formData.Celular}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Celular: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol className="d-flex justify-content-end gap-2">
                {editandoUsuario && (
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
                  color={editandoUsuario ? "primary" : "success"}
                  disabled={isSubmitDisabled}
                >
                  {enviando
                    ? "Guardando..."
                    : editandoUsuario
                      ? "Actualizar Usuario"
                      : "Guardar Usuario"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <UsuariosResTable usuarios={usuarios} onEditar={handleEditar} onReasignar={handleAbrirReasignar} />
        </CCol>
      </CRow>

      {/* Modal para reasignar usuario a otra dependencia */}
      <ModalAsignarDependencia
        visible={modalReasignarVisible}
        onClose={() => setModalReasignarVisible(false)}
        onSave={handleGuardarReasignar}
        usuario={usuarioReasignar}
        secretarias={secretariasResp}
        dependenciasPorSecretaria={dependenciasResp}
        onSecretariaChange={handleSecretariaChangeResp}
        loading={loadingReasignar}
      />
    </CForm>
  );
};

export default UsuariosResTab;
