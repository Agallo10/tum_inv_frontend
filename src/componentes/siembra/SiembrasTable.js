import React, { useState, useEffect, useRef } from 'react'
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
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cibDocusign } from '@coreui/icons'
import './ColumnVisibilityDropdown.scss'
import { exportToCsv } from '../../helpers'

const initialColumns = [
  { key: 'fecha', label: 'Fecha', visible: true },
  { key: 'lote', label: 'Lote', visible: true },
  { key: 'variedad', label: 'Variedad', visible: true },
  { key: 'patron', label: 'Patrón', visible: true },
  { key: 'proveedorMaterial', label: 'Proveedor', visible: true },
  { key: 'numeroPlantulasSembradas', label: '# Plántulas', visible: false },
  { key: 'numeroSiembraNueva', label: '# Siembra Nueva', visible: false },
  { key: 'numeroResiembra', label: '# Resiembra', visible: false },
  { key: 'distancia', label: 'Distancia Siembra (m)', visible: true },
  { key: 'operarioEncargado', label: 'Operario', visible: true },
]

const SiembrasTable = ({ siembras }) => {
  const [columns, setColumns] = useState(initialColumns)
  const [data, setData] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const totalPlantulas = data.reduce(
    (acc, curr) => acc + (parseInt(curr.numeroPlantulasSembradas) || 0), 0
  )

  useEffect(() => {
    if (siembras?.length) {
      const procesado = siembras.map((s) => ({
        ...s,
        fecha: new Date(s.fechaSiembra).toLocaleDateString(),
        distancia: `${s.distanciaSiembra?.calle ?? 0}x${s.distanciaSiembra?.plantas ?? 0}`,
      }))
      setData(procesado)
    }
  }, [siembras])

  const toggleColumn = (key) => {
    const updated = columns.map((col) =>
      col.key === key ? { ...col, visible: !col.visible } : col
    )
    setColumns(updated)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const descargaCsv = () => {
    const visibleKeys = columns.filter((c) => c.visible).map((c) => c.key)
    const exportData = data.map((row) => {
      const exportRow = {}
      visibleKeys.forEach((key) => {
        exportRow[key] = row[key]
      })
      return exportRow
    })
    exportToCsv(exportData, 'siembras.csv')
  }

  const visibleCols = columns.filter((col) => col.visible)

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-start align-items-center gap-2">
        <CDropdown
          ref={dropdownRef}
          className={`dropdown${dropdownOpen ? ' show' : ''}`}
        >
          <CDropdownToggle
            className="dropdown-toggle-custom"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Ocultar columnas"
          />
          <CDropdownMenu className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}>
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
          <strong>Total de plántulas:</strong> {totalPlantulas.toLocaleString('es-CO')}
        </div>
      </CCardHeader>

      <CCardBody>
        <CSmartTable
          items={data}
          columns={visibleCols}
          columnFilter
          itemsPerPage={5}
          itemsPerPageSelect
          pagination
          columnSorter
          tableProps={{
            striped: true,
            hover: true,
            className: 'my-table',
          }}
          paginationProps={{
            className: 'smart-pagination justify-content-start',
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default SiembrasTable
