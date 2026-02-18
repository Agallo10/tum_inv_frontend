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
  opcionesComponente,
} from "./helpers";
import { useHardwareStore, useNotificacion } from "../../hook";

import HardwareTable from "./HardwareTable";

const HardwareTab = ({ equipo }) => {
  const { ID } = equipo;

  const { cargarAllHardwareByEquipos, crearHardware, actualizarHardware } = useHardwareStore();
  const { mostrarExito, mostrarError, mostrarAdvertencia } = useNotificacion();
  const uid = ID;

  const initialState = {
    Componente: "",
    Tecnologia: "",
    Capacidad: "",
    // Categoria: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [editandoHardware, setEditandoHardware] = useState(null);
  const [allHardware, setAllHardware] = useState([]);

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
      if (editandoHardware) {
        const payload = construirPayload(formData, uid);
        await actualizarHardware(editandoHardware.ID, payload);
        mostrarExito("El hardware se actualizó correctamente", "¡Hardware actualizado!");
        setEditandoHardware(null);
      } else {
        const payload = construirPayload(formData, uid);
        const resultado = await crearHardware(payload);
        if (resultado) {
          mostrarExito("El hardware se registró correctamente", "¡Hardware creado!");
        } else {
          mostrarError("No se pudo registrar el hardware. Por favor, intente nuevamente.", "Error al crear hardware");
        }
      }
      resetFormData();
      cargarAllHardware();
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
    setEditandoHardware(null);
  };

  const handleEditar = (hardware) => {
    setEditandoHardware(hardware);
    setFormData({
      Componente: hardware.Componente || "",
      Tecnologia: hardware.Tecnologia || "",
      Capacidad: hardware.Capacidad || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSubmitDisabled =
    enviando || !formData.Tecnologia || !formData.Capacidad;
  !!errors.Componente;

  const cargarAllHardware = async () => {
    const allHardware = await cargarAllHardwareByEquipos(uid);
    console.log(allHardware);
    setAllHardware(allHardware);
  };

  useEffect(() => {
    if (!uid) return;
    cargarAllHardware();
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
                <CFormLabel>Componente</CFormLabel>
                <CFormSelect
                  value={formData.Componente}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Componente: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona un componente</option>
                  {opcionesComponente[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Tecnologia</CFormLabel>
                <CFormInput
                  value={formData.Tecnologia}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Tecnologia: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Capacidad</CFormLabel>
                <CFormInput
                  value={formData.Capacidad}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Capacidad: e.target.value,
                    })
                  }
                />
              </CCol>
              {/* <CCol>
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
              </CCol> */}
            </CRow>

            <CRow className="mt-3">
              <CCol className="d-flex justify-content-end gap-2">
                {editandoHardware && (
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
                  color={editandoHardware ? "primary" : "success"}
                  disabled={isSubmitDisabled}
                >
                  {enviando
                    ? "Guardando..."
                    : editandoHardware
                      ? "Actualizar Hardware"
                      : "Guardar Hardware"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <HardwareTable allHardware={allHardware} onEditar={handleEditar} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default HardwareTab;
