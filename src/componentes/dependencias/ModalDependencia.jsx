import { useState, useEffect } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
  CCol,
  CSpinner,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilSave } from "@coreui/icons";

const ModalDependencia = ({ visible, onClose, onSave, dependencia, secretariaId, loading }) => {
  const esEdicion = !!dependencia;

  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    UbicacionOficina: "",
    JefeOficina: "",
    CorreoInstitucional: "",
    Telefono: "",
    SecretariaID: secretariaId || 0,
  });

  useEffect(() => {
    if (dependencia) {
      setFormData({
        Nombre: dependencia.Nombre || "",
        Descripcion: dependencia.Descripcion || "",
        UbicacionOficina: dependencia.UbicacionOficina || "",
        JefeOficina: dependencia.JefeOficina || "",
        CorreoInstitucional: dependencia.CorreoInstitucional || "",
        Telefono: dependencia.Telefono || "",
        SecretariaID: dependencia.SecretariaID || secretariaId || 0,
      });
    } else {
      setFormData({
        Nombre: "",
        Descripcion: "",
        UbicacionOficina: "",
        JefeOficina: "",
        CorreoInstitucional: "",
        Telefono: "",
        SecretariaID: secretariaId || 0,
      });
    }
  }, [dependencia, visible, secretariaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, SecretariaID: Number(formData.SecretariaID) });
  };

  return (
    <CModal visible={visible} onClose={onClose} size="lg" backdrop="static">
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          <CModalTitle>
            {esEdicion ? "Editar Dependencia" : "Nueva Dependencia"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="g-3">
            <CCol md={6}>
              <CFormInput
                label="Nombre *"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
                placeholder="Nombre de la dependencia"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Jefe de Oficina *"
                name="JefeOficina"
                value={formData.JefeOficina}
                onChange={handleChange}
                placeholder="Nombre del jefe de oficina"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Ubicación Oficina *"
                name="UbicacionOficina"
                value={formData.UbicacionOficina}
                onChange={handleChange}
                placeholder="Ubicación de la oficina"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Correo Institucional *"
                name="CorreoInstitucional"
                value={formData.CorreoInstitucional}
                onChange={handleChange}
                placeholder="correo@tumaco-narino.gov.co"
                type="email"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Teléfono"
                name="Telefono"
                value={formData.Telefono}
                onChange={handleChange}
                placeholder="Teléfono de contacto"
              />
            </CCol>
            <CCol xs={12}>
              <CFormTextarea
                label="Descripción *"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleChange}
                placeholder="Descripción de la dependencia"
                rows={3}
                required
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </CButton>
          <CButton color="primary" type="submit" disabled={loading}>
            {loading ? (
              <CSpinner size="sm" className="me-2" />
            ) : (
              <CIcon icon={cilSave} className="me-2" />
            )}
            {esEdicion ? "Guardar Cambios" : "Crear Dependencia"}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default ModalDependencia;
