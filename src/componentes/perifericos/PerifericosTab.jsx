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

import { construirPayload, validarFormulario } from "./helpers";
import { usePerifericoStore, useNotificacion, useEquipoStore, useSecretariaStore, useDependenciaStore } from "../../hook";

import PerifericosTable from "./PerifericosTable";
import { opcionesTipoPeriferico } from "./helpers";
import ModalAsignarEquipo from "../sinasignar/ModalAsignarEquipo";

const PerifericosTab = ({ equipo }) => {
  const { ID } = equipo;

  const { cargarPerifericosByEquipos, crearPeriferico, actualizarPeriferico, asignarEquipo } = usePerifericoStore();
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useNotificacion();
  const { cargarEquiposByDependencia } = useEquipoStore();
  const { cargarSecretarias } = useSecretariaStore();
  const { cargarDependenciasBySecretariaUid } = useDependenciaStore();
  const uid = ID;

  const initialState = {
    PlacaInventario: "",
    Marca: "",
    TipoPeriferico: "",
    Serial: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [editandoPeriferico, setEditandoPeriferico] = useState(null);
  const [perifericos, setPerifericos] = useState([]);

  // Reasignar periférico state
  const [modalReasignarVisible, setModalReasignarVisible] = useState(false);
  const [perifericoReasignar, setPerifericoReasignar] = useState(null);
  const [secretariasResp, setSecretariasResp] = useState([]);
  const [dependenciasResp, setDependenciasResp] = useState([]);
  const [equiposResp, setEquiposResp] = useState([]);
  const [loadingReasignar, setLoadingReasignar] = useState(false);

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
      if (editandoPeriferico) {
        const payload = construirPayload(formData, uid);
        await actualizarPeriferico(editandoPeriferico.ID, payload);
        mostrarExito("El periférico se actualizó correctamente", "¡Periférico actualizado!");
        setEditandoPeriferico(null);
      } else {
        const payload = construirPayload(formData, uid);
        const resultado = await crearPeriferico(payload);
        if (resultado) {
          mostrarExito("El periférico se creó correctamente", "¡Periférico creado!");
        } else {
          mostrarError("No se pudo crear el periférico. Por favor, intente nuevamente.", "Error al crear periférico");
        }
      }
      resetFormData();
      cargarPerifericos();
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
    setEditandoPeriferico(null);
  };

  const handleEditar = (periferico) => {
    setEditandoPeriferico(periferico);
    setFormData({
      PlacaInventario: periferico.PlacaInventario || "",
      Marca: periferico.Marca || "",
      TipoPeriferico: periferico.TipoPeriferico || "",
      Serial: periferico.Serial || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSubmitDisabled =
    enviando ||
    !formData.PlacaInventario ||
    !formData.Marca ||
    !formData.Serial;
  // ||
  // !!errors.TipoVinculacion ||
  // !!errors.operario;

  const cargarPerifericos = async () => {
    const perifericos = await cargarPerifericosByEquipos(uid);
    setPerifericos(perifericos);
  };

  // === Handlers para reasignar periférico ===
  const handleAbrirReasignar = async (periferico) => {
    setPerifericoReasignar(periferico);
    setDependenciasResp([]);
    setEquiposResp([]);
    try {
      const datos = await cargarSecretarias();
      setSecretariasResp(datos || []);
    } catch {
      setSecretariasResp([]);
    }
    setModalReasignarVisible(true);
  };

  const handleSecretariaChangeResp = async (secretariaId) => {
    setEquiposResp([]);
    try {
      const datos = await cargarDependenciasBySecretariaUid(secretariaId);
      setDependenciasResp(datos || []);
    } catch {
      setDependenciasResp([]);
    }
  };

  const handleDependenciaChangeResp = async (dependenciaId) => {
    try {
      const datos = await cargarEquiposByDependencia(dependenciaId);
      setEquiposResp(datos || []);
    } catch {
      setEquiposResp([]);
    }
  };

  const handleGuardarReasignar = async (equipoId) => {
    setLoadingReasignar(true);
    try {
      await asignarEquipo(perifericoReasignar.ID, equipoId);
      mostrarExito("Periférico reasignado correctamente");
      setModalReasignarVisible(false);
      await cargarPerifericos();
    } catch (error) {
      mostrarError(error || "Error al reasignar periférico");
    } finally {
      setLoadingReasignar(false);
    }
  };

  useEffect(() => {
    if (!uid) return;
    cargarPerifericos();
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
              {/* <CCol>
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
              </CCol> */}
            </CRow>

            <CRow>
              <CCol>
                <CFormLabel>Tipo de periferico</CFormLabel>
                <CFormSelect
                  value={formData.TipoPeriferico}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      TipoPeriferico: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una tipo de Periferico</option>
                  {opcionesTipoPeriferico[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
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

            <CRow className="mt-3">
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
            </CRow>

            <CRow className="mt-3">
              <CCol className="d-flex justify-content-end gap-2">
                {editandoPeriferico && (
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
                  color={editandoPeriferico ? "primary" : "success"}
                  disabled={isSubmitDisabled}
                >
                  {enviando
                    ? "Guardando..."
                    : editandoPeriferico
                      ? "Actualizar Periferico"
                      : "Guardar Periferico"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <PerifericosTable perifericos={perifericos} onEditar={handleEditar} onReasignar={handleAbrirReasignar} />
        </CCol>
      </CRow>

      {/* Modal para reasignar periférico a otro equipo */}
      <ModalAsignarEquipo
        visible={modalReasignarVisible}
        onClose={() => setModalReasignarVisible(false)}
        onSave={handleGuardarReasignar}
        periferico={perifericoReasignar}
        secretarias={secretariasResp}
        dependenciasPorSecretaria={dependenciasResp}
        equiposPorDependencia={equiposResp}
        onSecretariaChange={handleSecretariaChangeResp}
        onDependenciaChange={handleDependenciaChangeResp}
        loading={loadingReasignar}
      />
    </CForm>
  );
};

export default PerifericosTab;
