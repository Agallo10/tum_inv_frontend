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
  { key: 'sistema', label: 'Sistema', visible: true },
  { key: 'numeroPlantas', label: '# Plantas', visible: true },
  { key: 'requerimientoArbol', label: 'Req/Árbol (L)', visible: true },
  { key: 'tiempoRiego', label: 'Tiempo de Riego (min)', visible: true },
  { key: 'descargaDifusor', label: 'Descarga Difusor (L)', visible: true },
  { key: 'aguaTotalLitros', label: 'Agua Total (L)', visible: true },
  { key: 'observaciones', label: 'Observaciones', visible: true },
]

const RiegoTable = ({ riegos }) => {
  const [columns, setColumns] = useState(initialColumns)
  const [data, setData] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const totalAgua = data.reduce(
    (acc, curr) => acc + (parseFloat(curr.aguaTotalLitros) || 0),
    0
  )

  useEffect(() => {
    if (riegos?.length) {
      const procesado = riegos.map((r) => ({
        ...r,
        fecha: new Date(r.fecha).toLocaleDateString(),
      }))
      setData(procesado)
    }
  }, [riegos])

  const toggleColumn = (key) => {
    setColumns((cols) =>
      cols.map((col) => (col.key === key ? { ...col, visible: !col.visible } : col))
    )
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
    exportToCsv(exportData, 'riegos.csv')
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

        <div className="total-agua-box">
          <strong>Total de litros:</strong> {totalAgua.toLocaleString('es-CO')} L
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

export default RiegoTable
