import React, { useState, useEffect } from "react";
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
} from "@coreui/react-pro";

import {
  construirPayload,
  validarFormulario,
  opcionesAsignacionIp,
} from "./helpers";
import { useConfigRedStore } from "../../hook";

const ConfigRedTab = ({ equipo }) => {
  const { ID } = equipo;
  const uid = ID;

  const { cargarAllConfigRedByEquipos, crearConfigRed, updateConfigRed } =
    useConfigRedStore();

  const initialState = {
    DireccionIP: "",
    AsignacionIP: "",
    NombreDispositivo: "",
    Conectividad: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [configRed, setConfigRed] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      const payload = construirPayload(formData, uid);
      await crearConfigRed(payload);
      resetFormData();
      setEnviando(false);
      cargarConfigRed();
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      const payload = construirPayload(formData, uid);
      await updateConfigRed(payload, configRed.ID);
      setEnviando(false);
      cargarConfigRed();
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
  };

  const isSubmitDisabled =
    enviando ||
    !formData.DireccionIP ||
    !formData.NombreDispositivo ||
    !formData.Conectividad ||
    !!errors.AsignacionIP;

  const cargarConfigRed = async () => {
    const data = await cargarAllConfigRedByEquipos(uid);
    console.log(data);
    // ✅ Verificar si devuelve array y tomar el primero
    if (data) {
      console.log(data);

      setConfigRed(data);
      setFormData({
        DireccionIP: data.DireccionIP || "",
        AsignacionIP: data.AsignacionIP || "",
        NombreDispositivo: data.NombreDispositivo || "",
        Conectividad: data.Conectividad || "",
      });
    } else {
      setConfigRed(null);
      setFormData(initialState);
    }
  };

  useEffect(() => {
    if (!uid) return;
    cargarConfigRed();
    console.log(configRed);
  }, [uid]);

  return (
    <CForm
      className="p-1"
      onSubmit={(e) => (configRed ? updateSubmit(e) : handleSubmit(e))}
    >
      <CRow className="mb-4">
        <CCol md={12}>
          <div className="p-3 border rounded shadow-sm bg-light h-100">
            <CRow>
              <CCol>
                <CFormLabel>Dirección IP</CFormLabel>
                <CFormInput
                  value={formData.DireccionIP}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      DireccionIP: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Asignación IP</CFormLabel>
                <CFormSelect
                  value={formData.AsignacionIP}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      AsignacionIP: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una opción</option>
                  {opcionesAsignacionIp[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Nombre de dispositivo</CFormLabel>
                <CFormInput
                  value={formData.NombreDispositivo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      NombreDispositivo: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Conectividad</CFormLabel>
                <CFormInput
                  value={formData.Conectividad}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Conectividad: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol className="text-end">
                <CButton
                  type="submit"
                  color={configRed ? "primary" : "success"}
                  disabled={isSubmitDisabled}
                >
                  {enviando
                    ? configRed
                      ? "Actualizando..."
                      : "Guardando..."
                    : configRed
                      ? "Actualizar configuración"
                      : "Guardar configuración"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ConfigRedTab;
