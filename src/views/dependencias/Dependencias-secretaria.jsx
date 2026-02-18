import { useEffect, useState } from "react";
import { useDependenciaStore } from "../../hook/index";
import { CCard, CCardBody, CCol, CRow, CButton, CTooltip } from "@coreui/react-pro";
import TarjetaDependencia from "../../componentes/tarjetas/tarjetaDependencia";
import { cilTask, cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import ModalDependencia from "../../componentes/dependencias/ModalDependencia";
import ModalConfirmarEliminacion from "../../componentes/common/ModalConfirmarEliminacion";
import { AuthStore } from "../../store/auth/auth.store";

const Dependencias = () => {
  const esAdmin = AuthStore((state) => state.user?.Rol) === "admin";
  const [tarjetas, setTarjetas] = useState([]);
  const {
    cargarDependenciasBySecretaria,
    crearDependencia,
    actualizarDependencia,
    eliminarDependencia,
  } = useDependenciaStore();

  const nombreSecretaria = localStorage.getItem("nombre-secretaria") || "Secretaría";
  const secretariaId = JSON.parse(localStorage.getItem("secretaria-id"));

  // Modal crear/editar
  const [modalVisible, setModalVisible] = useState(false);
  const [dependenciaEditar, setDependenciaEditar] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal eliminar
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [dependenciaEliminar, setDependenciaEliminar] = useState(null);

  ////////////////////////////////////////////////////////////////////////
  const cargarDatos = async () => {
    const dependencias = await cargarDependenciasBySecretaria();
    setTarjetas(dependencias);
  };
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    cargarDatos();
  }, []);
  ////////////////////////////////////////////////////////////////////////

  // Abrir modal para crear
  const handleCrear = () => {
    setDependenciaEditar(null);
    setModalVisible(true);
  };

  // Abrir modal para editar
  const handleEditar = (dependencia) => {
    setDependenciaEditar(dependencia);
    setModalVisible(true);
  };

  // Guardar (crear o editar)
  const handleGuardar = async (formData) => {
    setLoading(true);
    try {
      if (dependenciaEditar) {
        await actualizarDependencia(dependenciaEditar.ID, formData);
      } else {
        await crearDependencia(formData);
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
  const handleEliminar = (dependencia) => {
    setDependenciaEliminar(dependencia);
    setModalEliminarVisible(true);
  };

  // Confirmar eliminación
  const confirmarEliminar = async () => {
    setLoading(true);
    try {
      await eliminarDependencia(dependenciaEliminar.ID);
      setModalEliminarVisible(false);
      setDependenciaEliminar(null);
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
                    <h2 className="mb-2">
                      Dependencias/Oficinas - {nombreSecretaria}
                    </h2>
                  </div>
                </div>
                {esAdmin && (
                  <CTooltip content="Crear nueva dependencia">
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
      <CRow>
        {tarjetas &&
          tarjetas.map((item) => (
            <TarjetaDependencia
              className="mb-4"
              backgroundImage={item.img}
              id={item.ID}
              Descripcion={item.Descripcion}
              JefeOficina={item.JefeOficina}
              key={item.ID}
              Nombre={item.Nombre}
              UbicacionOficina={item.UbicacionOficina}
              nav={1}
              esAdmin={esAdmin}
              onEdit={() => handleEditar(item)}
              onDelete={() => handleEliminar(item)}
            />
          ))}
      </CRow>

      {/* Modal Crear/Editar */}
      <ModalDependencia
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleGuardar}
        dependencia={dependenciaEditar}
        secretariaId={secretariaId}
        loading={loading}
      />

      {/* Modal Confirmar Eliminación */}
      <ModalConfirmarEliminacion
        visible={modalEliminarVisible}
        onClose={() => setModalEliminarVisible(false)}
        onConfirm={confirmarEliminar}
        titulo="Eliminar Dependencia"
        mensaje={`¿Está seguro de que desea eliminar la dependencia "${dependenciaEliminar?.Nombre}"?`}
        advertencia="Los usuarios responsables asociados serán desvinculados de esta dependencia pero NO eliminados."
        loading={loading}
      />
    </>
  );
};

export default Dependencias;
