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
  construirPayload,
  validarFormulario,
  opcionesCategoria,
} from "./helpers";
import { useSoftwareStore, useNotificacion } from "../../hook";

import SoftwareTable from "./SoftwareTable";

const SoftwareTab = ({ equipo }) => {
  const { ID } = equipo;

  const { cargarAllSoftwareByEquipos, crearSoftware, actualizarSoftware } = useSoftwareStore();
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useNotificacion();
  const uid = ID;

  const initialState = {
    Nombre: "",
    Version: "",
    TipoLicencia: "",
    Categoria: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [editandoSoftware, setEditandoSoftware] = useState(null);
  const [allSoftware, setAllSoftware] = useState([]);

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
      if (editandoSoftware) {
        const payload = construirPayload(formData, uid);
        await actualizarSoftware(editandoSoftware.ID, payload);
        mostrarExito("El software se actualizó correctamente", "¡Software actualizado!");
        setEditandoSoftware(null);
      } else {
        const payload = construirPayload(formData, uid);
        const resultado = await crearSoftware(payload);
        if (resultado) {
          mostrarExito("El software se registró correctamente", "¡Software creado!");
        } else {
          mostrarError("No se pudo registrar el software. Por favor, intente nuevamente.", "Error al crear software");
        }
      }
      resetFormData();
      cargarAllSoftware();
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
    setEditandoSoftware(null);
  };

  const handleEditar = (software) => {
    setEditandoSoftware(software);
    setFormData({
      Nombre: software.Nombre || "",
      Version: software.Version || "",
      TipoLicencia: software.TipoLicencia || "",
      Categoria: software.Categoria || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSubmitDisabled =
    enviando || !formData.Nombre || !formData.Version || !formData.TipoLicencia;
  !!errors.Categoria;

  const cargarAllSoftware = async () => {
    const allSoftware = await cargarAllSoftwareByEquipos(uid);
    setAllSoftware(allSoftware);
  };

  useEffect(() => {
    if (!uid) return;
    cargarAllSoftware();
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
                <CFormLabel>Categoria</CFormLabel>
                <CFormSelect
                  value={formData.Categoria}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Categoria: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una categoria</option>
                  {opcionesCategoria[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Nombre</CFormLabel>
                <CFormInput
                  value={formData.Nombre}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Nombre: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Version</CFormLabel>
                <CFormInput
                  value={formData.Version}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Version: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Tipo de licencia</CFormLabel>
                <CFormInput
                  value={formData.TipoLicencia}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      TipoLicencia: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol className="d-flex justify-content-end gap-2">
                {editandoSoftware && (
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
                  color={editandoSoftware ? "primary" : "success"}
                  disabled={isSubmitDisabled}
                >
                  {enviando
                    ? "Guardando..."
                    : editandoSoftware
                      ? "Actualizar Software"
                      : "Guardar Software"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <SoftwareTable allSoftware={allSoftware} onEditar={handleEditar} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default SoftwareTab;
