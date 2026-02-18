import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CSpinner,
  CAlert,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilWarning, cilTrash } from "@coreui/icons";

const ModalConfirmarEliminacion = ({
  visible,
  onClose,
  onConfirm,
  titulo,
  mensaje,
  advertencia,
  loading,
}) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle className="text-danger">
          <CIcon icon={cilWarning} className="me-2" />
          {titulo || "Confirmar Eliminación"}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{mensaje || "¿Está seguro de que desea eliminar este elemento?"}</p>
        {advertencia && (
          <CAlert color="warning" className="d-flex align-items-center">
            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" />
            <div>{advertencia}</div>
          </CAlert>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" variant="outline" onClick={onClose} disabled={loading}>
          Cancelar
        </CButton>
        <CButton color="danger" onClick={onConfirm} disabled={loading}>
          {loading ? (
            <CSpinner size="sm" className="me-2" />
          ) : (
            <CIcon icon={cilTrash} className="me-2" />
          )}
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalConfirmarEliminacion;
