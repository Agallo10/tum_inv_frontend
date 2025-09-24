import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importa el hook

import {
  CSmartTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormCheck,
  CCard,
  CCardHeader,
  CCardBody,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cibDocusign } from "@coreui/icons";
import "./ColumnVisibilityDropdown.scss";
import { exportToCsv } from "../../helpers";

const initialColumns = [
  { key: "FechaDiligenciamiento", label: "Fecha", visible: true },
  { key: "Serial", label: "Serial", visible: true },
  { key: "TipoDispositivo", label: "Tipo", visible: true },
  { key: "PlacaInventario", label: "Placa", visible: true },
  { key: "Marca", label: "Marca", visible: true },
  { key: "Modelo", label: "Modelo", visible: false },
  { key: "ObservacionesGenerales", label: "Observaciones", visible: false },
  //   { key: 'usuario responsable', label: '# Resiembra', visible: false },
  //   { key: 'dependencia', label: 'Distancia Siembra (m)', visible: true },
];

const EquiposTable = ({ equipos, pages }) => {
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const totalPlantulas = data.reduce(
    (acc, curr) => acc + (parseInt(curr.numeroPlantulasSembradas) || 0),
    0
  );

  useEffect(() => {
    if (equipos?.length) {
      const procesado = equipos.map((e) => ({
        ...e,
        FechaDiligenciamiento: new Date(
          e.FechaDiligenciamiento
        ).toLocaleDateString(),
        // distancia: `${s.distanciaSiembra?.calle ?? 0}x${s.distanciaSiembra?.plantas ?? 0}`,
      }));
      setData(procesado);
    }
  }, [equipos]);

  const toggleColumn = (key) => {
    const updated = columns.map((col) =>
      col.key === key ? { ...col, visible: !col.visible } : col
    );
    setColumns(updated);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const descargaCsv = () => {
    const visibleKeys = columns.filter((c) => c.visible).map((c) => c.key);
    const exportData = data.map((row) => {
      const exportRow = {};
      visibleKeys.forEach((key) => {
        exportRow[key] = row[key];
      });
      return exportRow;
    });
    exportToCsv(exportData, "siembras.csv");
  };

  const visibleCols = columns.filter((col) => col.visible);

  const handleRowClick = (item) => {
    navigate("/detalle-equipo", { state: { equipo: item } });
  };

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-start align-items-center gap-2">
        <CDropdown
          ref={dropdownRef}
          className={`dropdown${dropdownOpen ? " show" : ""}`}
        >
          <CDropdownToggle
            className="dropdown-toggle-custom"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Ocultar columnas"
          />
          <CDropdownMenu
            className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
          >
            {columns.map((col) => (
              <CDropdownItem key={col.key} onClick={(e) => e.stopPropagation()}>
                <CFormCheck
                  id={`toggle-${col.key}`}
                  label={col.label}
                  checked={col.visible}
                  onChange={() => toggleColumn(col.key)}
                />
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>

        <div
          className="icon-container"
          onClick={descargaCsv}
          title="Descargar datos"
          role="button"
        >
          <CIcon icon={cibDocusign} />
        </div>

        <div className="total-plantulas-box">
          {/* <strong>Total de plántulas:</strong>{" "} */}
          {/* {totalPlantulas.toLocaleString("es-CO")} */}
        </div>
      </CCardHeader>

      <CCardBody>
        <CSmartTable
          items={data}
          columns={visibleCols}
          columnFilter
          itemsPerPage={pages}
          itemsPerPageSelect
          pagination
          columnSorter
          tableProps={{
            striped: true,
            hover: true,
            className: "my-table",
          }}
          paginationProps={{
            className: "smart-pagination justify-content-start",
          }}
          clickableRows
          onRowClick={(item) => handleRowClick(item)}
        />
      </CCardBody>
    </CCard>
  );
};

export default EquiposTable;
