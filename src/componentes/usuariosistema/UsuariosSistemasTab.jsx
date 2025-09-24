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
  opcionesEsAdmin,
} from "./helpers";
import { useUsuarioSistemaStore } from "../../hook";
import UsuarioSistemaTable from "./UsuariosSistemasTable";

const UsuarioSistemaTab = ({ equipo }) => {
  const { ID } = equipo;

  const { cargarUsuarioaSistemaByEquipos, crearUsuarioSistema } =
    useUsuarioSistemaStore();
  const uid = ID;

  const initialState = {
    NombreUsuario: "",
    Contrasena: "",
    EsAdministrador: false,
    // Categoria: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true);
      const payload = construirPayload(formData, uid);
      await crearUsuarioSistema(payload);
      resetFormData();
      setEnviando(false);
      cargarAllUsuarios();
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
  };

  const isSubmitDisabled =
    enviando || !formData.NombreUsuario || !formData.Contrasena;
  //   !!errors.EsAdministrador;

  const cargarAllUsuarios = async () => {
    const usuarios = await cargarUsuarioaSistemaByEquipos(uid);
    const usuariosConTexto = usuarios.map((u) => ({
      ...u,
      EsAdministrador: u.EsAdministrador ? "Si" : "No",
    }));

    setUsuarios(usuariosConTexto);
  };

  useEffect(() => {
    if (!uid) return;
    cargarAllUsuarios();
  }, [uid]);

  return (
    <CForm className="p-1" onSubmit={handleSubmit}>
      <CRow className="mb-4">
        {/* 🟩 Columna 1 */}
        <CCol md={12}>
          <div className="p-3 border rounded shadow-sm bg-light h-100">
            <CRow>
              <CCol>
                <CFormLabel>Nombre Usuario</CFormLabel>
                <CFormInput
                  value={formData.NombreUsuario}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      NombreUsuario: e.target.value,
                    })
                  }
                />
              </CCol>
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
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Es Administrador?</CFormLabel>
                <CFormSelect
                  value={String(formData.EsAdministrador)} // convertimos el valor booleano a string para el select
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      EsAdministrador: e.target.value === "true", // convertimos string a boolean
                    })
                  }
                >
                  <option value=""> Selecciona si es administrador</option>
                  {opcionesEsAdmin[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol className="mt-4">
                <CButton
                  type="submit"
                  color="success"
                  disabled={isSubmitDisabled}
                >
                  {enviando ? "Guardando..." : "Guardar usuario"}
                </CButton>
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

            {/* <CRow className="mt-3">
              <CCol className="text-end">
                <CButton
                  type="submit"
                  color="success"
                  disabled={isSubmitDisabled}
                >
                  {enviando ? "Guardando..." : "Guardar hardware"}
                </CButton>
              </CCol>
            </CRow> */}
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <UsuarioSistemaTable usuarios={usuarios} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default UsuarioSistemaTab;
