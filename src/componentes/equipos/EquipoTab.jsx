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
  getFechaActual,
  construirPayloadEquipo,
  validarFormularioEquipo,
  opcionesTipoEquipo,
} from "./helpers";

import { useEquipoStore } from "../../hook/equipos/useEquipoStore";
import EquiposTable from "./EquiposTable";
import { useUsuarioResponsableStore } from "../../hook/ususariosresponsables/useUsuarioResponsableStore";

const EquipoTab = () => {
  const { crearEquipo, cargarEquiposByDependencia } = useEquipoStore();
  const { cargarUsuariosResponsablesByDependencia } =
    useUsuarioResponsableStore();
  const uid = localStorage.getItem("dependencia-id");
  const fechaHoy = getFechaActual();

  //   const initialState = {
  //     fecha: fechaHoy,
  //     lote: "",
  //     variedad: "",
  //     patron: "",
  //     proveedorMaterial: "",
  //     numeroPlantulas: "",
  //     siembraNueva: "",
  //     resiembra: "",
  //     distanciaCalle: "",
  //     distanciaPlanta: "",
  //     operario: "",
  //   };

  const initialState = {
    FechaDiligenciamiento: fechaHoy,
    TipoDispositivo: "",
    PlacaInventario: "",
    Marca: "",
    Serial: "",
    Modelo: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [siembras, setSiembras] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [opcionesUsuarios, setOpcionesUsuarios] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validarFormularioSiembra(formData);
    const validationErrors = validarFormularioEquipo(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(validationErrors);
      setEnviando(true);
      const payload = construirPayloadEquipo(formData, uid, fechaHoy);
      await crearEquipo(payload);
      resetFormData();
      setEnviando(false);
      cargarEquipos();
    }
  };

  const resetFormData = () => {
    setFormData(initialState);
    setErrors({});
  };

  const isSubmitDisabled =
    enviando ||
    !formData.Marca ||
    !formData.Modelo ||
    !formData.PlacaInventario;
  // ||
  // !!errors.numeroPlantulas ||
  // !!errors;

  const cargarEquipos = async () => {
    const equipos = await cargarEquiposByDependencia(uid);
    // console.log(equipos);
    setEquipos(equipos);
  };

  const cargarUsuariosResponsables = async () => {
    const usuariosResponsables =
      await cargarUsuariosResponsablesByDependencia(uid);

    const usuariosResponsablesMap = usuariosResponsables.map((u) => {
      console.log(u.ID);
      return { value: u.ID, label: u.NombresApellidos };
    });

    const opcionesUsuarios = [
      { value: "", label: "Seleccione" },
      ...usuariosResponsablesMap,
    ];

    setOpcionesUsuarios(opcionesUsuarios);
  };

  useEffect(() => {
    if (!uid) return;
    // cargaSiembras();
    cargarEquipos();
    cargarUsuariosResponsables();
  }, [uid]);

  return (
    <CForm className="p-1" onSubmit={handleSubmit}>
      <CRow className="mb-4">
        {/* 🟩 Columna 1 */}
        <CCol md={6}>
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
                <CFormLabel>Modelo</CFormLabel>
                <CFormInput
                  value={formData.Modelo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Modelo: e.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CFormLabel>Tipo de dispositivo</CFormLabel>
                <CFormSelect
                  value={formData.TipoDispositivo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      TipoDispositivo: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una tipo</option>
                  {opcionesTipoEquipo[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
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
            </CRow>

            <CRow className="mt-3">
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
          </div>
        </CCol>

        {/* 🟦 Columna 2 */}
        <CCol md={6}>
          <div className="p-3 border rounded shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            {/* <CRow className="mb-3">
              <CCol>
                <CFormLabel># Siembra Nueva</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.siembraNueva}
                  onChange={(e) =>
                    setFormData({ ...formData, siembraNueva: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel># Resiembra</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.resiembra}
                  onChange={(e) =>
                    setFormData({ ...formData, resiembra: e.target.value })
                  }
                />
              </CCol>
            </CRow> */}

            <CRow className="mb-3">
              {/* <CCol>
                <CFormLabel>Distancia Calle (m)</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.distanciaCalle}
                  onChange={(e) =>
                    setFormData({ ...formData, distanciaCalle: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Distancia Planta (m)</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.distanciaPlanta}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      distanciaPlanta: e.target.value,
                    })
                  }
                />
              </CCol> */}
              <CCol>
                <CFormLabel>Observaciones</CFormLabel>
                <CFormTextarea
                  rows={2}
                  value={formData.observaciones}
                  onChange={(e) =>
                    setFormData({ ...formData, observaciones: e.target.value })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="align-items-end">
              <CCol>
                <CFormLabel>Usuario Responsable</CFormLabel>
                <CFormSelect
                  value={formData.UsuarioResponsableID}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      UsuarioResponsableID: e.target.value,
                    })
                  }
                  invalid={!!errors.UsuarioResponsableID}
                >
                  {opcionesUsuarios.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>
                  {errors.UsuarioResponsableID}
                </CFormFeedback>
              </CCol>

              <CCol className="text-end">
                <CButton
                  type="submit"
                  color="success"
                  disabled={isSubmitDisabled}
                >
                  {enviando ? "Guardando..." : "Guardar Equipo"}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <EquiposTable equipos={equipos} pages={5} />
        </CCol>
      </CRow>
    </CForm>
  );
};

export default EquipoTab;
