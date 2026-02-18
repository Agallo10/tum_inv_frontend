import React, { useEffect, useState, useRef } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CSpinner,
  CSmartTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormCheck,
  CButton,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilScreenDesktop,
  cilPeople,
  cilBan,
  cilLink,
} from "@coreui/icons";
import { cibDocusign } from "@coreui/icons";
import {
  useSinAsignarStore,
  useEquipoStore,
  useUsuarioResponsableStore,
} from "../../hook/index";
import { useSecretariaStore, useDependenciaStore } from "../../hook/index";
import { useNotificacion } from "../../hook";
import { exportToCsv } from "../../helpers";
import ModalAsignarResponsable from "../../componentes/sinasignar/ModalAsignarResponsable";
import ModalAsignarDependencia from "../../componentes/sinasignar/ModalAsignarDependencia";
import "../../componentes/equipos/ColumnVisibilityDropdown.scss";

const initialColsEquipos = [
  { key: "TipoDispositivo", label: "Tipo", visible: true },
  { key: "Marca", label: "Marca", visible: true },
  { key: "Modelo", label: "Modelo", visible: true },
  { key: "Serial", label: "Serial", visible: true },
  { key: "PlacaInventario", label: "Placa", visible: true },
  { key: "Estado", label: "Estado", visible: true },
  { key: "NombresApellidos", label: "Responsable", visible: true },
  { key: "Cedula", label: "Cédula", visible: true },
];

const initialColsUsuarios = [
  { key: "NombresApellidos", label: "Nombres y Apellidos", visible: true },
  { key: "Cedula", label: "Cédula", visible: true },
  { key: "CorreoPersonal", label: "Correo", visible: true },
  { key: "TipoVinculacion", label: "Vinculación", visible: true },
  { key: "Celular", label: "Celular", visible: true },
  { key: "TotalEquipos", label: "Equipos Asignados", visible: true },
];

const SinSecretaria = () => {
  const { cargarSinSecretaria } = useSinAsignarStore();
  const { asignarResponsable } = useEquipoStore();
  const { asignarDependencia, cargarUsuariosResponsablesByDependencia } = useUsuarioResponsableStore();
  const { cargarSecretarias } = useSecretariaStore();
  const { cargarDependenciasBySecretariaUid } = useDependenciaStore();
  const { mostrarExito, mostrarError } = useNotificacion();

  const [equipos, setEquipos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Column visibility state
  const [colsEquipos, setColsEquipos] = useState(initialColsEquipos);
  const [colsUsuarios, setColsUsuarios] = useState(initialColsUsuarios);
  const [ddEquiposOpen, setDdEquiposOpen] = useState(false);
  const [ddUsuariosOpen, setDdUsuariosOpen] = useState(false);
  const ddEquiposRef = useRef(null);
  const ddUsuariosRef = useRef(null);

  // Modal asignar responsable state
  const [modalResponsableVisible, setModalResponsableVisible] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [listaSecretariasResp, setListaSecretariasResp] = useState([]);
  const [listaDependenciasResp, setListaDependenciasResp] = useState([]);
  const [listaUsuariosPorDep, setListaUsuariosPorDep] = useState([]);
  const [loadingAsignar, setLoadingAsignar] = useState(false);

  // Modal asignar dependencia state
  const [modalDependenciaVisible, setModalDependenciaVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [listaSecretarias, setListaSecretarias] = useState([]);
  const [listaDependencias, setListaDependencias] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ddEquiposRef.current && !ddEquiposRef.current.contains(event.target)) {
        setDdEquiposOpen(false);
      }
      if (ddUsuariosRef.current && !ddUsuariosRef.current.contains(event.target)) {
        setDdUsuariosOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const datos = await cargarSinSecretaria();
      setEquipos(datos?.equipos || []);
      setUsuarios(datos?.usuarios || []);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setEquipos([]);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleColEquipos = (key) => {
    setColsEquipos((prev) =>
      prev.map((col) => (col.key === key ? { ...col, visible: !col.visible } : col))
    );
  };

  const toggleColUsuarios = (key) => {
    setColsUsuarios((prev) =>
      prev.map((col) => (col.key === key ? { ...col, visible: !col.visible } : col))
    );
  };

  const descargaCsvEquipos = () => {
    const visibleKeys = colsEquipos.filter((c) => c.visible).map((c) => c.key);
    const exportData = equipos.map((row) => {
      const r = {};
      visibleKeys.forEach((k) => (r[k] = row[k]));
      return r;
    });
    exportToCsv(exportData, "equipos-sin-secretaria.csv");
  };

  const descargaCsvUsuarios = () => {
    const visibleKeys = colsUsuarios.filter((c) => c.visible).map((c) => c.key);
    const exportData = usuarios.map((row) => {
      const r = {};
      visibleKeys.forEach((k) => (r[k] = row[k]));
      return r;
    });
    exportToCsv(exportData, "usuarios-sin-secretaria.csv");
  };

  // === Handlers para asignar responsable a equipo ===
  const handleAbrirAsignarResponsable = async (equipo) => {
    setEquipoSeleccionado(equipo);
    setListaDependenciasResp([]);
    setListaUsuariosPorDep([]);
    try {
      const datos = await cargarSecretarias();
      setListaSecretariasResp(datos || []);
    } catch {
      setListaSecretariasResp([]);
    }
    setModalResponsableVisible(true);
  };

  const handleSecretariaChangeResp = async (secretariaId) => {
    setListaUsuariosPorDep([]);
    try {
      const datos = await cargarDependenciasBySecretariaUid(secretariaId);
      setListaDependenciasResp(datos || []);
    } catch {
      setListaDependenciasResp([]);
    }
  };

  const handleDependenciaChangeResp = async (dependenciaId) => {
    try {
      const datos = await cargarUsuariosResponsablesByDependencia(dependenciaId);
      setListaUsuariosPorDep(datos || []);
    } catch {
      setListaUsuariosPorDep([]);
    }
  };

  const handleGuardarResponsable = async (usuarioResponsableId) => {
    setLoadingAsignar(true);
    try {
      await asignarResponsable(equipoSeleccionado.ID, usuarioResponsableId);
      mostrarExito("Responsable asignado correctamente");
      setModalResponsableVisible(false);
      await cargarDatos(); // recargar tablas
    } catch (error) {
      mostrarError(error || "Error al asignar responsable");
    } finally {
      setLoadingAsignar(false);
    }
  };

  // === Handlers para asignar dependencia a usuario ===
  const handleAbrirAsignarDependencia = async (usuario) => {
    setUsuarioSeleccionado(usuario);
    setListaDependencias([]);
    try {
      const datos = await cargarSecretarias();
      setListaSecretarias(datos || []);
    } catch {
      setListaSecretarias([]);
    }
    setModalDependenciaVisible(true);
  };

  const handleSecretariaChange = async (secretariaId) => {
    try {
      const datos = await cargarDependenciasBySecretariaUid(secretariaId);
      setListaDependencias(datos || []);
    } catch {
      setListaDependencias([]);
    }
  };

  const handleGuardarDependencia = async (dependenciaId) => {
    setLoadingAsignar(true);
    try {
      await asignarDependencia(usuarioSeleccionado.ID, dependenciaId);
      mostrarExito("Dependencia asignada correctamente");
      setModalDependenciaVisible(false);
      await cargarDatos(); // recargar tablas
    } catch (error) {
      mostrarError(error || "Error al asignar dependencia");
    } finally {
      setLoadingAsignar(false);
    }
  };

  const visibleEquipos = [
    ...colsEquipos.filter((col) => col.visible),
    { key: "acciones", label: "Acciones", filter: false, sorter: false },
  ];
  const visibleUsuarios = [
    ...colsUsuarios.filter((col) => col.visible),
    { key: "acciones", label: "Acciones", filter: false, sorter: false },
  ];

  return (
    <>
      {/* Header Section */}
      <CRow className="mb-4">
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm bg-info bg-gradient text-white">
            <CCardBody className="p-4">
              <div className="d-flex align-items-center gap-3">
                <CIcon icon={cilBan} size="3xl" />
                <div>
                  <h2 className="mb-2">Equipos y Responsables sin Secretaría</h2>
                  <p className="mb-0 opacity-75">
                    Listado de equipos y usuarios responsables que no tienen una
                    secretaría/dependencia asignada. Estos elementos requieren
                    atención para su correcta organización.
                  </p>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {loading ? (
        <div className="text-center py-5">
          <CSpinner color="primary" />
          <p className="mt-2 text-muted">Cargando datos...</p>
        </div>
      ) : (
        <>
          {/* Tabla de Equipos sin secretaría */}
          <CRow className="mb-4">
            <CCol xs={12}>
              <CCard>
                <CCardHeader className="d-flex justify-content-start align-items-center gap-2">
                  <CDropdown
                    ref={ddEquiposRef}
                    className={`dropdown${ddEquiposOpen ? " show" : ""}`}
                  >
                    <CDropdownToggle
                      className="dropdown-toggle-custom"
                      onClick={() => setDdEquiposOpen(!ddEquiposOpen)}
                      title="Ocultar columnas"
                    />
                    <CDropdownMenu className={`dropdown-menu${ddEquiposOpen ? " show" : ""}`}>
                      {colsEquipos.map((col) => (
                        <CDropdownItem key={col.key} onClick={(e) => e.stopPropagation()}>
                          <CFormCheck
                            id={`toggle-eq-${col.key}`}
                            label={col.label}
                            checked={col.visible}
                            onChange={() => toggleColEquipos(col.key)}
                          />
                        </CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>

                  <div
                    className="icon-container"
                    onClick={descargaCsvEquipos}
                    title="Descargar equipos CSV"
                    role="button"
                  >
                    <CIcon icon={cibDocusign} />
                  </div>

                  <div className="ms-3">
                    <CIcon icon={cilScreenDesktop} className="me-2" />
                    <strong>Equipos sin Secretaría ({equipos.length})</strong>
                  </div>
                </CCardHeader>

                <CCardBody className="table-responsive">
                  <CSmartTable
                    items={equipos}
                    columns={visibleEquipos}
                    columnFilter
                    columnSorter
                    pagination
                    itemsPerPage={50}
                    itemsPerPageSelect
                    tableProps={{
                      striped: true,
                      hover: true,
                      className: "my-table",
                      responsive: true,
                    }}
                    paginationProps={{
                      className: "smart-pagination justify-content-start",
                    }}
                    noItemsLabel="No hay equipos sin secretaría asignada"
                    scopedColumns={{
                      acciones: (item) => (
                        <td>
                          <CButton
                            color="info"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAbrirAsignarResponsable(item)}
                            title="Vincular responsable"
                          >
                            <CIcon icon={cilLink} className="me-1" />
                            Vincular
                          </CButton>
                        </td>
                      ),
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {/* Tabla de Usuarios Responsables sin secretaría */}
          <CRow>
            <CCol xs={12}>
              <CCard>
                <CCardHeader className="d-flex justify-content-start align-items-center gap-2">
                  <CDropdown
                    ref={ddUsuariosRef}
                    className={`dropdown${ddUsuariosOpen ? " show" : ""}`}
                  >
                    <CDropdownToggle
                      className="dropdown-toggle-custom"
                      onClick={() => setDdUsuariosOpen(!ddUsuariosOpen)}
                      title="Ocultar columnas"
                    />
                    <CDropdownMenu className={`dropdown-menu${ddUsuariosOpen ? " show" : ""}`}>
                      {colsUsuarios.map((col) => (
                        <CDropdownItem key={col.key} onClick={(e) => e.stopPropagation()}>
                          <CFormCheck
                            id={`toggle-usr-${col.key}`}
                            label={col.label}
                            checked={col.visible}
                            onChange={() => toggleColUsuarios(col.key)}
                          />
                        </CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>

                  <div
                    className="icon-container"
                    onClick={descargaCsvUsuarios}
                    title="Descargar usuarios CSV"
                    role="button"
                  >
                    <CIcon icon={cibDocusign} />
                  </div>

                  <div className="ms-3">
                    <CIcon icon={cilPeople} className="me-2" />
                    <strong>Usuarios Responsables sin Secretaría ({usuarios.length})</strong>
                  </div>
                </CCardHeader>

                <CCardBody className="table-responsive">
                  <CSmartTable
                    items={usuarios}
                    columns={visibleUsuarios}
                    columnFilter
                    columnSorter
                    pagination
                    itemsPerPage={50}
                    itemsPerPageSelect
                    tableProps={{
                      striped: true,
                      hover: true,
                      className: "my-table",
                      responsive: true,
                    }}
                    paginationProps={{
                      className: "smart-pagination justify-content-start",
                    }}
                    noItemsLabel="No hay usuarios responsables sin secretaría"
                    scopedColumns={{
                      acciones: (item) => (
                        <td>
                          <CButton
                            color="info"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAbrirAsignarDependencia(item)}
                            title="Vincular a dependencia"
                          >
                            <CIcon icon={cilLink} className="me-1" />
                            Vincular
                          </CButton>
                        </td>
                      ),
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}

      {/* Modales de asignación */}
      <ModalAsignarResponsable
        visible={modalResponsableVisible}
        onClose={() => setModalResponsableVisible(false)}
        onSave={handleGuardarResponsable}
        equipo={equipoSeleccionado}
        secretarias={listaSecretariasResp}
        dependenciasPorSecretaria={listaDependenciasResp}
        usuariosPorDependencia={listaUsuariosPorDep}
        onSecretariaChange={handleSecretariaChangeResp}
        onDependenciaChange={handleDependenciaChangeResp}
        loading={loadingAsignar}
      />

      <ModalAsignarDependencia
        visible={modalDependenciaVisible}
        onClose={() => setModalDependenciaVisible(false)}
        onSave={handleGuardarDependencia}
        usuario={usuarioSeleccionado}
        secretarias={listaSecretarias}
        dependenciasPorSecretaria={listaDependencias}
        onSecretariaChange={handleSecretariaChange}
        loading={loadingAsignar}
      />
    </>
  );
};

export default SinSecretaria;
