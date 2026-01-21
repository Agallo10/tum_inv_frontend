import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CSpinner,
  CBadge,
  CSmartTable,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilPeople,
  cilPlus,
  cilPencil,
  cilTrash,
  cilUser,
} from "@coreui/icons";
import { useUsuarioStore } from "../../hook/usuarios/useUsuarioStore";
import { useNotificacion } from "../../hook";

const Usuarios = () => {
  const {
    cargarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    isLoading,
  } = useUsuarioStore();

  const { mostrarAdvertencia, mostrarExito } = useNotificacion();

  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Estado del formulario
  const initialFormState = {
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    username: "",
    password: "",
    rol: "tecnico",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Opciones de roles
  const opcionesRol = [
    { value: "admin", label: "Administrador" },
    { value: "tecnico", label: "Técnico" },
    { value: "usuario", label: "Usuario" },
  ];

  // Columnas de la tabla (usando PascalCase como viene del backend)
  const columns = [
    { key: "Nombre", label: "Nombre", _style: { width: "15%" } },
    { key: "Apellido", label: "Apellido", _style: { width: "15%" } },
    { key: "Cedula", label: "Cédula", _style: { width: "12%" } },
    { key: "Email", label: "Email", _style: { width: "20%" } },
    { key: "Username", label: "Usuario", _style: { width: "12%" } },
    { key: "Rol", label: "Rol", _style: { width: "10%" } },
    {
      key: "acciones",
      label: "Acciones",
      _style: { width: "16%" },
      filter: false,
      sorter: false,
    },
  ];

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const data = await cargarUsuarios();
    // Asegurar que siempre sea un array
    setUsuarios(Array.isArray(data) ? data : []);
  };

  // Validar formulario
  const validarFormulario = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    }

    if (!formData.cedula.trim()) {
      newErrors.cedula = "La cédula es requerida";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    }

    if (!modoEdicion && !formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (!modoEdicion && formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.rol) {
      newErrors.rol = "El rol es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Abrir modal para crear usuario
  const handleNuevoUsuario = () => {
    setModoEdicion(false);
    setUsuarioEditando(null);
    setFormData(initialFormState);
    setErrors({});
    setModalVisible(true);
  };

  // Abrir modal para editar usuario
  const handleEditarUsuario = (usuario) => {
    setModoEdicion(true);
    setUsuarioEditando(usuario);
    setFormData({
      nombre: usuario.Nombre || "",
      apellido: usuario.Apellido || "",
      cedula: usuario.Cedula || "",
      email: usuario.Email || "",
      username: usuario.Username || "",
      password: "", // No mostramos la contraseña
      rol: usuario.Rol || "tecnico",
    });
    setErrors({});
    setModalVisible(true);
  };

  // Confirmar eliminación
  const handleConfirmarEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
    setModalEliminarVisible(true);
  };

  // Eliminar usuario
  const handleEliminarUsuario = async () => {
    if (!usuarioAEliminar) return;

    const resultado = await eliminarUsuario(usuarioAEliminar.ID);
    if (resultado) {
      await cargarDatos();
    }
    setModalEliminarVisible(false);
    setUsuarioAEliminar(null);
  };

  // Guardar usuario (crear o actualizar)
  const handleGuardar = async () => {
    if (!validarFormulario()) {
      mostrarAdvertencia("Por favor complete todos los campos requeridos");
      return;
    }

    let resultado;

    if (modoEdicion) {
      // Si estamos editando y no hay contraseña, no la enviamos
      const payload = { ...formData };
      if (!payload.password) {
        delete payload.password;
      }
      resultado = await actualizarUsuario(usuarioEditando.ID, payload);
    } else {
      resultado = await crearUsuario(formData);
    }

    if (resultado) {
      setModalVisible(false);
      setFormData(initialFormState);
      await cargarDatos();
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Obtener color del badge según el rol
  const getRolBadgeColor = (rol) => {
    switch (rol) {
      case "admin":
        return "danger";
      case "tecnico":
        return "primary";
      case "usuario":
        return "success";
      default:
        return "secondary";
    }
  };

  // Obtener label del rol
  const getRolLabel = (rol) => {
    const opcion = opcionesRol.find((o) => o.value === rol);
    return opcion ? opcion.label : rol;
  };

  return (
    <>
      {/* Header Section */}
      <CRow className="mb-4">
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm bg-info bg-gradient text-white">
            <CCardBody className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <CIcon icon={cilPeople} size="3xl" />
                  <div>
                    <h2 className="mb-2">Administración de Usuarios</h2>
                    <p className="mb-0 opacity-75">
                      Gestiona los usuarios del sistema. Aquí puedes crear,
                      editar y eliminar usuarios, así como asignar roles y
                      permisos.
                    </p>
                  </div>
                </div>
                <CButton
                  color="light"
                  className="d-flex align-items-center gap-2"
                  onClick={handleNuevoUsuario}
                >
                  <CIcon icon={cilPlus} />
                  Nuevo Usuario
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Tabla de usuarios */}
      <CRow>
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm">
            <CCardHeader className="bg-white border-0">
              <h5 className="mb-0">
                <CIcon icon={cilUser} className="me-2" />
                Lista de Usuarios
              </h5>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <div className="text-center py-5">
                  <CSpinner color="primary" />
                  <p className="mt-2 text-muted">Cargando usuarios...</p>
                </div>
              ) : (
                <CSmartTable
                  items={usuarios}
                  columns={columns}
                  columnFilter
                  columnSorter
                  pagination
                  itemsPerPage={10}
                  itemsPerPageSelect
                  tableProps={{
                    striped: true,
                    hover: true,
                    responsive: true,
                  }}
                  noItemsLabel="No hay usuarios registrados"
                  scopedColumns={{
                    Rol: (item) => (
                      <td>
                        <CBadge color={getRolBadgeColor(item.Rol)}>
                          {getRolLabel(item.Rol)}
                        </CBadge>
                      </td>
                    ),
                    acciones: (item) => (
                      <td>
                        <CButton
                          color="primary"
                          variant="ghost"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditarUsuario(item)}
                          title="Editar usuario"
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="danger"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleConfirmarEliminar(item)}
                          title="Eliminar usuario"
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </td>
                    ),
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal de crear/editar usuario */}
      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={modoEdicion ? cilPencil : cilPlus} className="me-2" />
            {modoEdicion ? "Editar Usuario" : "Nuevo Usuario"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Nombre *</CFormLabel>
                <CFormInput
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Carlos"
                  invalid={!!errors.nombre}
                />
                {errors.nombre && (
                  <div className="invalid-feedback d-block">{errors.nombre}</div>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel>Apellido *</CFormLabel>
                <CFormInput
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  placeholder="Ej: Pérez García"
                  invalid={!!errors.apellido}
                />
                {errors.apellido && (
                  <div className="invalid-feedback d-block">{errors.apellido}</div>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Cédula *</CFormLabel>
                <CFormInput
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleInputChange}
                  placeholder="Ej: 1234567890"
                  invalid={!!errors.cedula}
                />
                {errors.cedula && (
                  <div className="invalid-feedback d-block">{errors.cedula}</div>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel>Email *</CFormLabel>
                <CFormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej: juan.perez@municipio.gov.co"
                  invalid={!!errors.email}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Nombre de Usuario *</CFormLabel>
                <CFormInput
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Ej: jperez"
                  invalid={!!errors.username}
                />
                {errors.username && (
                  <div className="invalid-feedback d-block">{errors.username}</div>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel>
                  Contraseña {modoEdicion ? "(dejar vacío para no cambiar)" : "*"}
                </CFormLabel>
                <CFormInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={modoEdicion ? "••••••••" : "Mínimo 6 caracteres"}
                  invalid={!!errors.password}
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">{errors.password}</div>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Rol *</CFormLabel>
                <CFormSelect
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  invalid={!!errors.rol}
                >
                  {opcionesRol.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </CFormSelect>
                {errors.rol && (
                  <div className="invalid-feedback d-block">{errors.rol}</div>
                )}
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            variant="ghost"
            onClick={() => setModalVisible(false)}
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleGuardar} disabled={isLoading}>
            {isLoading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : modoEdicion ? (
              "Actualizar"
            ) : (
              "Crear Usuario"
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal de confirmación de eliminación */}
      <CModal
        visible={modalEliminarVisible}
        onClose={() => setModalEliminarVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilTrash} className="me-2 text-danger" />
            Confirmar Eliminación
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            ¿Está seguro que desea eliminar al usuario{" "}
            <strong>
              {usuarioAEliminar?.Nombre} {usuarioAEliminar?.Apellido}
            </strong>
            ?
          </p>
          <p className="text-muted mb-0">Esta acción no se puede deshacer.</p>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            variant="ghost"
            onClick={() => setModalEliminarVisible(false)}
          >
            Cancelar
          </CButton>
          <CButton
            color="danger"
            onClick={handleEliminarUsuario}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Usuarios;
