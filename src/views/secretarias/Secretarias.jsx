import { useEffect, useState } from "react";
import { useSecretariaStore } from "../../hook/index";
import { CCard, CCardBody, CRow, CCol, CButton, CTooltip } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilTask, cilPlus } from "@coreui/icons";
import TarjetaSecretaria from "../../componentes/tarjetas/tarjetaSecretaria";
import ModalSecretaria from "../../componentes/secretarias/ModalSecretaria";
import ModalConfirmarEliminacion from "../../componentes/common/ModalConfirmarEliminacion";
import { AuthStore } from "../../store/auth/auth.store";

const Secretarias = () => {
  const esAdmin = AuthStore((state) => state.user?.Rol) === "admin";
  const [tarjetas, setTarjetas] = useState([]);
  const { cargarSecretarias, crearSecretaria, actualizarSecretaria, eliminarSecretaria } =
    useSecretariaStore();

  // Modal crear/editar
  const [modalVisible, setModalVisible] = useState(false);
  const [secretariaEditar, setSecretariaEditar] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal eliminar
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [secretariaEliminar, setSecretariaEliminar] = useState(null);

  ////////////////////////////////////////////////////////////////////////
  const cargarDatos = async () => {
    const secretarias = await cargarSecretarias();
    setTarjetas(secretarias);
  };
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    cargarDatos();
  }, []);
  ////////////////////////////////////////////////////////////////////////

  // Abrir modal para crear
  const handleCrear = () => {
    setSecretariaEditar(null);
    setModalVisible(true);
  };

  // Abrir modal para editar
  const handleEditar = (secretaria) => {
    setSecretariaEditar(secretaria);
    setModalVisible(true);
  };

  // Guardar (crear o editar)
  const handleGuardar = async (formData) => {
    setLoading(true);
    try {
      if (secretariaEditar) {
        await actualizarSecretaria(secretariaEditar.ID, formData);
      } else {
        await crearSecretaria(formData);
      }
      setModalVisible(false);
      await cargarDatos();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // Abrir confirmación de eliminación
  const handleEliminar = (secretaria) => {
    setSecretariaEliminar(secretaria);
    setModalEliminarVisible(true);
  };

  // Confirmar eliminación
  const confirmarEliminar = async () => {
    setLoading(true);
    try {
      await eliminarSecretaria(secretariaEliminar.ID);
      setModalEliminarVisible(false);
      setSecretariaEliminar(null);
      await cargarDatos();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* Header Section */}
      <CRow className="mb-4">
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm bg-info bg-gradient text-white">
            <CCardBody className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <CIcon icon={cilTask} size="3xl" />
                  <div>
                    <h2 className="mb-2">Secretarías - Administrar Equipos</h2>
                    <p className="mb-0 opacity-75">
                      Plataforma integral para la gestión y seguimiento del
                      inventario tecnológico de las secretarías. Este sistema
                      permite administrar equipos de cómputo, periféricos,
                      software y configuraciones de red de manera centralizada.
                    </p>
                  </div>
                </div>
                {esAdmin && (
                  <CTooltip content="Crear nueva secretaría">
                    <CButton
                      variant="outline"
                      onClick={handleCrear}
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{
                        borderColor: "white",
                        color: "white",
                        borderRadius: "8px",
                      }}
                    >
                      <CIcon icon={cilPlus} />
                      <span className="fw-semibold">Agregar</span>
                    </CButton>
                  </CTooltip>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Cards Section */}
      <CRow className="g-4">
        {tarjetas &&
          tarjetas.map((item) => (
            <TarjetaSecretaria
              backgroundImage={item.img}
              id={item.ID}
              Descripcion={item.Descripcion}
              Secretario={item.Secretario}
              key={item.ID}
              Nombre={item.Nombre}
              Ubicacion={item.Ubicacion}
              nav={1}
              esAdmin={esAdmin}
              onEdit={() => handleEditar(item)}
              onDelete={() => handleEliminar(item)}
            />
          ))}
      </CRow>

      {/* Modal Crear/Editar */}
      <ModalSecretaria
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleGuardar}
        secretaria={secretariaEditar}
        loading={loading}
      />

      {/* Modal Confirmar Eliminación */}
      <ModalConfirmarEliminacion
        visible={modalEliminarVisible}
        onClose={() => setModalEliminarVisible(false)}
        onConfirm={confirmarEliminar}
        titulo="Eliminar Secretaría"
        mensaje={`¿Está seguro de que desea eliminar la secretaría "${secretariaEliminar?.Nombre}"?`}
        advertencia="Esta acción eliminará también todas las dependencias asociadas a esta secretaría. Los usuarios responsables serán desvinculados pero NO eliminados."
        loading={loading}
      />
    </>
  );
};

export default Secretarias;
