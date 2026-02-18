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
import { cilBan, cilLink, cilMouse } from "@coreui/icons";
import { cibDocusign } from "@coreui/icons";
import {
  usePerifericoStore,
  useEquipoStore,
  useSecretariaStore,
  useDependenciaStore,
} from "../../hook/index";
import { useNotificacion } from "../../hook";
import { exportToCsv } from "../../helpers";
import ModalAsignarEquipo from "../../componentes/sinasignar/ModalAsignarEquipo";
import "../../componentes/equipos/ColumnVisibilityDropdown.scss";

const initialColsPerifericos = [
  { key: "TipoPeriferico", label: "Tipo", visible: true },
  { key: "PlacaInventario", label: "Placa Inventario", visible: true },
  { key: "Marca", label: "Marca", visible: true },
  { key: "Serial", label: "Serial", visible: true },
];

const SinEquipo = () => {
  const { cargarPerifericosSinEquipo, asignarEquipo } = usePerifericoStore();
  const { cargarEquiposByDependencia } = useEquipoStore();
  const { cargarSecretarias } = useSecretariaStore();
  const { cargarDependenciasBySecretariaUid } = useDependenciaStore();
  const { mostrarExito, mostrarError } = useNotificacion();

  const [perifericos, setPerifericos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Column visibility
  const [colsPerifericos, setColsPerifericos] = useState(initialColsPerifericos);
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef(null);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [perifericoSeleccionado, setPerifericoSeleccionado] = useState(null);
  const [listaSecretarias, setListaSecretarias] = useState([]);
  const [listaDependencias, setListaDependencias] = useState([]);
  const [listaEquipos, setListaEquipos] = useState([]);
  const [loadingAsignar, setLoadingAsignar] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ddRef.current && !ddRef.current.contains(event.target)) {
        setDdOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const datos = await cargarPerifericosSinEquipo();
      setPerifericos(datos || []);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setPerifericos([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCol = (key) => {
    setColsPerifericos((prev) =>
      prev.map((col) => (col.key === key ? { ...col, visible: !col.visible } : col))
    );
  };

  const descargaCsv = () => {
    const visibleKeys = colsPerifericos.filter((c) => c.visible).map((c) => c.key);
    const exportData = perifericos.map((row) => {
      const r = {};
      visibleKeys.forEach((k) => (r[k] = row[k]));
      return r;
    });
    exportToCsv(exportData, "perifericos-sin-equipo.csv");
  };

  // === Handlers para asignar equipo ===
  const handleAbrirAsignarEquipo = async (periferico) => {
    setPerifericoSeleccionado(periferico);
    setListaDependencias([]);
    setListaEquipos([]);
    try {
      const datos = await cargarSecretarias();
      setListaSecretarias(datos || []);
    } catch {
      setListaSecretarias([]);
    }
    setModalVisible(true);
  };

  const handleSecretariaChange = async (secretariaId) => {
    setListaEquipos([]);
    try {
      const datos = await cargarDependenciasBySecretariaUid(secretariaId);
      setListaDependencias(datos || []);
    } catch {
      setListaDependencias([]);
    }
  };

  const handleDependenciaChange = async (dependenciaId) => {
    try {
      const datos = await cargarEquiposByDependencia(dependenciaId);
      setListaEquipos(datos || []);
    } catch {
      setListaEquipos([]);
    }
  };

  const handleGuardarEquipo = async (equipoId) => {
    setLoadingAsignar(true);
    try {
      await asignarEquipo(perifericoSeleccionado.ID, equipoId);
      mostrarExito("Equipo asignado correctamente");
      setModalVisible(false);
      await cargarDatos();
    } catch (error) {
      mostrarError(error || "Error al asignar equipo");
    } finally {
      setLoadingAsignar(false);
    }
  };

  const visibleCols = [
    ...colsPerifericos.filter((col) => col.visible),
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
                  <h2 className="mb-2">Periféricos sin Equipo Asignado</h2>
                  <p className="mb-0 opacity-75">
                    Listado de periféricos que no tienen un equipo asignado.
                    Estos elementos fueron liberados al eliminar un equipo y
                    requieren ser reasignados.
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
        <CRow className="mb-4">
          <CCol xs={12}>
            <CCard>
              <CCardHeader className="d-flex justify-content-start align-items-center gap-2">
                <CDropdown
                  ref={ddRef}
                  className={`dropdown${ddOpen ? " show" : ""}`}
                >
                  <CDropdownToggle
                    className="dropdown-toggle-custom"
                    onClick={() => setDdOpen(!ddOpen)}
                    title="Ocultar columnas"
                  />
                  <CDropdownMenu className={`dropdown-menu${ddOpen ? " show" : ""}`}>
                    {colsPerifericos.map((col) => (
                      <CDropdownItem key={col.key} onClick={(e) => e.stopPropagation()}>
                        <CFormCheck
                          id={`toggle-perif-${col.key}`}
                          label={col.label}
                          checked={col.visible}
                          onChange={() => toggleCol(col.key)}
                        />
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>

                <div
                  className="icon-container"
                  onClick={descargaCsv}
                  title="Descargar periféricos CSV"
                  role="button"
                >
                  <CIcon icon={cibDocusign} />
                </div>

                <div className="ms-3">
                  <CIcon icon={cilMouse} className="me-2" />
                  <strong>Periféricos sin Equipo ({perifericos.length})</strong>
                </div>
              </CCardHeader>

              <CCardBody className="table-responsive">
                <CSmartTable
                  items={perifericos}
                  columns={visibleCols}
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
                  noItemsLabel="No hay periféricos sin equipo asignado"
                  scopedColumns={{
                    acciones: (item) => (
                      <td>
                        <CButton
                          color="info"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAbrirAsignarEquipo(item)}
                          title="Vincular a equipo"
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
      )}

      {/* Modal de asignación */}
      <ModalAsignarEquipo
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleGuardarEquipo}
        periferico={perifericoSeleccionado}
        secretarias={listaSecretarias}
        dependenciasPorSecretaria={listaDependencias}
        equiposPorDependencia={listaEquipos}
        onSecretariaChange={handleSecretariaChange}
        onDependenciaChange={handleDependenciaChange}
        loading={loadingAsignar}
      />
    </>
  );
};

export default SinEquipo;
