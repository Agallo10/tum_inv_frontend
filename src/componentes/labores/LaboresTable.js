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
import { cibDocusign, cilPrint } from '@coreui/icons'
import './ColumnVisibilityDropdown.scss'
import { exportToCsv, AHtiempo } from '../../helpers' // AHtiempo importado aquí
import { generarPDFLabores } from './helpers' // Asegúrate de que la ruta es correcta

const initialColumns = [
  { key: 'fecha', label: 'Fecha', visible: true },
  { key: 'laborRealizada', label: 'Labores Realizadas', visible: true },
  { key: 'numeroJornales', label: 'N° Jornales', visible: true },
  { key: 'costoJornales', label: 'Costo por Jornal ($)', visible: true },
  { key: 'insumos', label: 'Insumos y Materiales', visible: true },
  { key: 'observaciones', label: 'Observaciones', visible: true },
  { key: 'costoTotal', label: 'Costo Total ($)', visible: true },
]

const LaboresTable = ({ labores }) => {
  const [columns, setColumns] = useState(initialColumns)
  const [data, setData] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (labores?.length) {
      const procesado = labores.map((l) => ({
        ...l,
        insumos: l.insumosYMateriales
          ?.map((i) => `${i.nombre}: $${i.costo}`)
          .join(', ') || 'Ninguno',
        fecha: AHtiempo(l.fecha).formattedDate, // usamos AHtiempo aquí
      }))
      setData(procesado)
    }
  }, [labores])

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
    exportToCsv(exportData, 'labores_diarias.csv')
  }

  const generarPDF = () => {
    generarPDFLabores({
      columns,
      data,
      totalCostos,
      titulo: 'Reporte de Labores Diarias',
    })
  }

  const visibleCols = columns.filter((col) => col.visible)
  const totalCostos = data.reduce((sum, l) => sum + (parseFloat(l.costoTotal) || 0), 0)

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-start align-items-center">
        <div className="dropdown-container d-flex align-items-center">

          {/* Icono de imprimir */}
          <div
            className="icon-container me-2"
            onClick={generarPDF}
            title="Generar PDF"
            role="button"
          >
            <CIcon icon={cilPrint} />
          </div>

          {/* Dropdown de columnas */}
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

          {/* Icono para descargar CSV */}
          <div
            className="icon-container ms-2"
            onClick={descargaCsv}
            title="Descargar datos"
            role="button"
          >
            <CIcon icon={cibDocusign} />
          </div>

          {/* Total */}
          <div className="costo-total-box ms-3">
            <strong>Costo total actividades:</strong> ${totalCostos.toLocaleString()}
          </div>

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

export default LaboresTable
