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
import { usePerifericoStore } from "../../hook";

import PerifericosTable from "./PerifericosTable";
import { opcionesTipoPeriferico } from "./helpers";

const PerifericosTab = ({ equipo }) => {
  const { ID } = equipo;

  const { cargarPerifericosByEquipos, crearPeriferico } = usePerifericoStore();
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
  const [perifericos, setPerifericos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      const payload = construirPayload(formData, uid);
      await crearPeriferico(payload);
      resetFormData();
      setEnviando(false);
      cargarPerifericos();
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
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

  useEffect(() => {
    if (!uid) return;
    cargarPerifericos();
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
              <CCol className="text-end">
                <CButton
                  type="submit"
                  color="success"
                  disabled={isSubmitDisabled}
                >
                  {enviando ? "Guardando..." : "Guardar Periferico"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <PerifericosTable perifericos={perifericos} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default PerifericosTab;
