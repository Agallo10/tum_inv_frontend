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
import { useHardwareStore } from "../../hook";

import HardwareTable from "./HardwareTable";

const HardwareTab = ({ equipo }) => {
  const { ID } = equipo;

  const { cargarAllHardwareByEquipos, crearHardware } = useHardwareStore();
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
  const [allHardware, setAllHardware] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      const payload = construirPayload(formData, uid);
      await crearHardware(payload);
      resetFormData();
      setEnviando(false);
      cargarAllHardware();
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
  };

  const isSubmitDisabled =
    enviando || !formData.Tecnologia || !formData.Capacidad;
  !!errors.Componente;

  const cargarAllHardware = async () => {
    const allHardware = await cargarAllHardwareByEquipos(uid);
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
          <div className="p-3 border rounded shadow-sm bg-light h-100">
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
              <CCol className="text-end">
                <CButton
                  type="submit"
                  color="success"
                  disabled={isSubmitDisabled}
                >
                  {enviando ? "Guardando..." : "Guardar hardware"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <HardwareTable allHardware={allHardware} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default HardwareTab;
