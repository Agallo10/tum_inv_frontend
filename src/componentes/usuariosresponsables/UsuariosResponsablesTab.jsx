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

const UsuariosResTab = () => {
  const { cargarUsuariosResponsablesByDependencia, crearUsuarioResponsable } =
    useUsuarioResponsableStore();
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
  const [usuarios, setUsuarios] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormularioUsuarios(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      const payload = construirPayloadUsuario(formData, uid);
      await crearUsuarioResponsable(payload);
      resetFormData();
      setEnviando(false);
      cargarUsuariosResponsables();
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
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
              <CCol className="text-end">
                <CButton
                  type="submit"
                  color="success"
                  disabled={isSubmitDisabled}
                >
                  {enviando ? "Guardando..." : "Guardar Usuario"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <UsuariosResTable usuarios={usuarios} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default UsuariosResTab;
