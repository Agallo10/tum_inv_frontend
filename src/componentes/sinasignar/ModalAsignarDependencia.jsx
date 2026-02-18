import React, { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormSelect,
  CFormLabel,
  CSpinner,
  CRow,
  CCol,
} from "@coreui/react-pro";

/**
 * Modal para asignar una dependencia a un usuario responsable.
 * Usa dos selects encadenados: Secretaría → Dependencia.
 * Props:
 *  - visible: boolean
 *  - onClose: () => void
 *  - onSave: (dependenciaId: number) => Promise<void>
 *  - usuario: objeto del usuario seleccionado (con NombresApellidos, Cedula, etc.)
 *  - secretarias: array [{ID, Nombre}, ...]
 *  - dependenciasPorSecretaria: array [{ID, Nombre}, ...] (filtradas)
 *  - onSecretariaChange: (secretariaId: number) => void — para cargar dependencias
 *  - loading: boolean
 */
const ModalAsignarDependencia = ({
  visible,
  onClose,
  onSave,
  usuario,
  secretarias = [],
  dependenciasPorSecretaria = [],
  onSecretariaChange,
  loading = false,
}) => {
  const [selectedSecretaria, setSelectedSecretaria] = useState("");
  const [selectedDependencia, setSelectedDependencia] = useState("");

  useEffect(() => {
    if (visible) {
      setSelectedSecretaria("");
      setSelectedDependencia("");
    }
  }, [visible]);

  const handleSecretariaChange = (e) => {
    const id = e.target.value;
    setSelectedSecretaria(id);
    setSelectedDependencia("");
    if (id && onSecretariaChange) {
      onSecretariaChange(Number(id));
    }
  };

  const handleGuardar = () => {
    if (!selectedDependencia) return;
    onSave(Number(selectedDependencia));
  };

  return (
    <CModal visible={visible} onClose={onClose} alignment="center">
      <CModalHeader>
        <CModalTitle>Asignar Dependencia al Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {usuario && (
          <div className="mb-3 p-3 bg-light rounded">
            <strong>Usuario:</strong> {usuario.NombresApellidos}
            <br />
            <strong>Cédula:</strong> {usuario.Cedula}
            {usuario.CorreoPersonal && (
              <>
                <br />
                <strong>Correo:</strong> {usuario.CorreoPersonal}
              </>
            )}
          </div>
        )}

        <CRow className="mb-3">
          <CCol>
            <CFormLabel htmlFor="selectSecretaria">1. Seleccione la secretaría:</CFormLabel>
            <CFormSelect
              id="selectSecretaria"
              value={selectedSecretaria}
              onChange={handleSecretariaChange}
            >
              <option value="">-- Seleccione una secretaría --</option>
              {secretarias.map((s) => (
                <option key={s.ID} value={s.ID}>
                  {s.Nombre}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormLabel htmlFor="selectDependencia">2. Seleccione la dependencia:</CFormLabel>
            <CFormSelect
              id="selectDependencia"
              value={selectedDependencia}
              onChange={(e) => setSelectedDependencia(e.target.value)}
              disabled={!selectedSecretaria || dependenciasPorSecretaria.length === 0}
            >
              <option value="">
                {!selectedSecretaria
                  ? "-- Primero seleccione una secretaría --"
                  : dependenciasPorSecretaria.length === 0
                    ? "-- No hay dependencias --"
                    : "-- Seleccione una dependencia --"}
              </option>
              {dependenciasPorSecretaria.map((d) => (
                <option key={d.ID} value={d.ID}>
                  {d.Nombre}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" variant="ghost" onClick={onClose} disabled={loading}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleGuardar} disabled={!selectedDependencia || loading}>
          {loading ? <CSpinner size="sm" className="me-2" /> : null}
          Asignar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalAsignarDependencia;
