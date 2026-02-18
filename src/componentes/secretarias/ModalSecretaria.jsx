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

const ModalSecretaria = ({ visible, onClose, onSave, secretaria, loading }) => {
  const esEdicion = !!secretaria;

  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    Ubicacion: "",
    Secretario: "",
    Telefono: "",
  });

  useEffect(() => {
    if (secretaria) {
      setFormData({
        Nombre: secretaria.Nombre || "",
        Descripcion: secretaria.Descripcion || "",
        Ubicacion: secretaria.Ubicacion || "",
        Secretario: secretaria.Secretario || "",
        Telefono: secretaria.Telefono || "",
      });
    } else {
      setFormData({
        Nombre: "",
        Descripcion: "",
        Ubicacion: "",
        Secretario: "",
        Telefono: "",
      });
    }
  }, [secretaria, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <CModal visible={visible} onClose={onClose} size="lg" backdrop="static">
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          <CModalTitle>
            {esEdicion ? "Editar Secretaría" : "Nueva Secretaría"}
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
                placeholder="Nombre de la secretaría"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Secretario *"
                name="Secretario"
                value={formData.Secretario}
                onChange={handleChange}
                placeholder="Nombre del secretario"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Ubicación *"
                name="Ubicacion"
                value={formData.Ubicacion}
                onChange={handleChange}
                placeholder="Ubicación de la secretaría"
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
                placeholder="Descripción de la secretaría"
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
            {esEdicion ? "Guardar Cambios" : "Crear Secretaría"}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default ModalSecretaria;
