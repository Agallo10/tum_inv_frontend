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
  opcionesPlataforma,
} from "./helpers";
import { useAccesoRemotoStore } from "../../hook";

import AccesoRemotoTable from "./AccesoRemotoTable";

const AccesoRemotoTab = ({ equipo }) => {
  const { ID } = equipo;

  const { cargarAllAccesosRemotosByEquipos, crearAccesoRemoto } =
    useAccesoRemotoStore();
  const uid = ID;

  const initialState = {
    Usuario: "",
    Contrasena: "",
    IDConexion: "",
    Plataforma: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [allAccesosRemotos, setAllAccesosRemotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      const payload = construirPayload(formData, uid);
      await crearAccesoRemoto(payload);
      resetFormData();
      setEnviando(false);
      cargarAllAccesosRemotos();
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
  };

  const isSubmitDisabled =
    enviando ||
    !formData.Usuario ||
    !formData.Contrasena ||
    !formData.IDConexion;
  !!errors.Plataforma;

  const cargarAllAccesosRemotos = async () => {
    const allAccesosRemotos = await cargarAllAccesosRemotosByEquipos(uid);
    setAllAccesosRemotos(allAccesosRemotos);
  };

  useEffect(() => {
    if (!uid) return;
    cargarAllAccesosRemotos();
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
                <CFormLabel>Plataforma</CFormLabel>
                <CFormSelect
                  value={formData.Plataforma}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Plataforma: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una Plataforma</option>
                  {opcionesPlataforma[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Usuario</CFormLabel>
                <CFormInput
                  value={formData.Usuario}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Usuario: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Contraseña</CFormLabel>
                <CFormInput
                  value={formData.Contrasena}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Contrasena: e.target.value,
                    })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>ID de Conexion</CFormLabel>
                <CFormInput
                  value={formData.IDConexion}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      IDConexion: e.target.value,
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
                  {enviando ? "Guardando..." : "Guardar Acceso remoto"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <AccesoRemotoTable allAccesosRemotos={allAccesosRemotos} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default AccesoRemotoTab;
