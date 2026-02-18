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
 * Modal para asignar un usuario responsable a un equipo.
 * Usa tres selects encadenados: Secretaría → Dependencia → Usuario Responsable.
 * Props:
 *  - visible: boolean
 *  - onClose: () => void
 *  - onSave: (usuarioResponsableId: number) => Promise<void>
 *  - equipo: objeto del equipo seleccionado
 *  - secretarias: array [{ID, Nombre}, ...]
 *  - dependenciasPorSecretaria: array [{ID, Nombre}, ...] (filtradas)
 *  - usuariosPorDependencia: array [{ID, NombresApellidos, Cedula}, ...] (filtrados)
 *  - onSecretariaChange: (secretariaId: number) => void
 *  - onDependenciaChange: (dependenciaId: number) => void
 *  - loading: boolean
 */
const ModalAsignarResponsable = ({
  visible,
  onClose,
  onSave,
  equipo,
  secretarias = [],
  dependenciasPorSecretaria = [],
  usuariosPorDependencia = [],
  onSecretariaChange,
  onDependenciaChange,
  loading = false,
}) => {
  const [selectedSecretaria, setSelectedSecretaria] = useState("");
  const [selectedDependencia, setSelectedDependencia] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState("");

  useEffect(() => {
    if (visible) {
      setSelectedSecretaria("");
      setSelectedDependencia("");
      setSelectedUsuario("");
    }
  }, [visible]);

  const handleSecretariaChange = (e) => {
    const id = e.target.value;
    setSelectedSecretaria(id);
    setSelectedDependencia("");
    setSelectedUsuario("");
    if (id && onSecretariaChange) {
      onSecretariaChange(Number(id));
    }
  };

  const handleDependenciaChange = (e) => {
    const id = e.target.value;
    setSelectedDependencia(id);
    setSelectedUsuario("");
    if (id && onDependenciaChange) {
      onDependenciaChange(Number(id));
    }
  };

  const handleGuardar = () => {
    if (!selectedUsuario) return;
    onSave(Number(selectedUsuario));
  };

  return (
    <CModal visible={visible} onClose={onClose} alignment="center">
      <CModalHeader>
        <CModalTitle>Asignar Responsable al Equipo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {equipo && (
          <div className="mb-3 p-3 bg-body-secondary rounded">
            <strong>Equipo:</strong> {equipo.TipoDispositivo} — {equipo.Marca} {equipo.Modelo}
            <br />
            <strong>Serial:</strong> {equipo.Serial}
            {equipo.PlacaInventario && (
              <>
                <br />
                <strong>Placa:</strong> {equipo.PlacaInventario}
              </>
            )}
          </div>
        )}

        <CRow className="mb-3">
          <CCol>
            <CFormLabel htmlFor="selectSecretariaEq">1. Seleccione la secretaría:</CFormLabel>
            <CFormSelect
              id="selectSecretariaEq"
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

        <CRow className="mb-3">
          <CCol>
            <CFormLabel htmlFor="selectDependenciaEq">2. Seleccione la dependencia:</CFormLabel>
            <CFormSelect
              id="selectDependenciaEq"
              value={selectedDependencia}
              onChange={handleDependenciaChange}
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

        <CRow>
          <CCol>
            <CFormLabel htmlFor="selectResponsable">3. Seleccione el responsable:</CFormLabel>
            <CFormSelect
              id="selectResponsable"
              value={selectedUsuario}
              onChange={(e) => setSelectedUsuario(e.target.value)}
              disabled={!selectedDependencia || usuariosPorDependencia.length === 0}
            >
              <option value="">
                {!selectedDependencia
                  ? "-- Primero seleccione una dependencia --"
                  : usuariosPorDependencia.length === 0
                    ? "-- No hay usuarios en esta dependencia --"
                    : "-- Seleccione un responsable --"}
              </option>
              {usuariosPorDependencia.map((u) => (
                <option key={u.ID} value={u.ID}>
                  {u.NombresApellidos} — CC {u.Cedula}
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
        <CButton color="primary" onClick={handleGuardar} disabled={!selectedUsuario || loading}>
          {loading ? <CSpinner size="sm" className="me-2" /> : null}
          Asignar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalAsignarResponsable;
