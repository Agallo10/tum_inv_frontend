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
 * Modal para asignar un equipo a un periférico.
 * Usa tres selects encadenados: Secretaría → Dependencia → Equipo.
 * Props:
 *  - visible: boolean
 *  - onClose: () => void
 *  - onSave: (equipoId: number) => Promise<void>
 *  - periferico: objeto del periférico seleccionado
 *  - secretarias: array [{ID, Nombre}, ...]
 *  - dependenciasPorSecretaria: array [{ID, Nombre}, ...] (filtradas)
 *  - equiposPorDependencia: array [{ID, TipoDispositivo, Marca, Serial}, ...] (filtrados)
 *  - onSecretariaChange: (secretariaId: number) => void
 *  - onDependenciaChange: (dependenciaId: number) => void
 *  - loading: boolean
 */
const ModalAsignarEquipo = ({
  visible,
  onClose,
  onSave,
  periferico,
  secretarias = [],
  dependenciasPorSecretaria = [],
  equiposPorDependencia = [],
  onSecretariaChange,
  onDependenciaChange,
  loading = false,
}) => {
  const [selectedSecretaria, setSelectedSecretaria] = useState("");
  const [selectedDependencia, setSelectedDependencia] = useState("");
  const [selectedEquipo, setSelectedEquipo] = useState("");

  useEffect(() => {
    if (visible) {
      setSelectedSecretaria("");
      setSelectedDependencia("");
      setSelectedEquipo("");
    }
  }, [visible]);

  const handleSecretariaChange = (e) => {
    const id = e.target.value;
    setSelectedSecretaria(id);
    setSelectedDependencia("");
    setSelectedEquipo("");
    if (id && onSecretariaChange) {
      onSecretariaChange(Number(id));
    }
  };

  const handleDependenciaChange = (e) => {
    const id = e.target.value;
    setSelectedDependencia(id);
    setSelectedEquipo("");
    if (id && onDependenciaChange) {
      onDependenciaChange(Number(id));
    }
  };

  const handleGuardar = () => {
    if (!selectedEquipo) return;
    onSave(Number(selectedEquipo));
  };

  return (
    <CModal visible={visible} onClose={onClose} alignment="center">
      <CModalHeader>
        <CModalTitle>Asignar Equipo al Periférico</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {periferico && (
          <div className="mb-3 p-3 bg-body-secondary rounded">
            <strong>Periférico:</strong> {periferico.TipoPeriferico} — {periferico.Marca}
            <br />
            <strong>Serial:</strong> {periferico.Serial}
            {periferico.PlacaInventario && (
              <>
                <br />
                <strong>Placa:</strong> {periferico.PlacaInventario}
              </>
            )}
          </div>
        )}

        <CRow className="mb-3">
          <CCol>
            <CFormLabel htmlFor="selectSecretariaPerif">1. Seleccione la secretaría:</CFormLabel>
            <CFormSelect
              id="selectSecretariaPerif"
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
            <CFormLabel htmlFor="selectDependenciaPerif">2. Seleccione la dependencia:</CFormLabel>
            <CFormSelect
              id="selectDependenciaPerif"
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
            <CFormLabel htmlFor="selectEquipoPerif">3. Seleccione el equipo:</CFormLabel>
            <CFormSelect
              id="selectEquipoPerif"
              value={selectedEquipo}
              onChange={(e) => setSelectedEquipo(e.target.value)}
              disabled={!selectedDependencia || equiposPorDependencia.length === 0}
            >
              <option value="">
                {!selectedDependencia
                  ? "-- Primero seleccione una dependencia --"
                  : equiposPorDependencia.length === 0
                    ? "-- No hay equipos en esta dependencia --"
                    : "-- Seleccione un equipo --"}
              </option>
              {equiposPorDependencia.map((eq) => (
                <option key={eq.ID} value={eq.ID}>
                  {eq.TipoDispositivo} — {eq.Marca} — {eq.Serial}
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
        <CButton color="primary" onClick={handleGuardar} disabled={!selectedEquipo || loading}>
          {loading ? <CSpinner size="sm" className="me-2" /> : null}
          Asignar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalAsignarEquipo;
