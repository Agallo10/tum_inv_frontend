// src/components/TablaPlagas.js
import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import { plagasKeys } from './helpers'

const TablaPlagas = ({ plagaData, fecha, fechaIntervencion, observaciones }) => {
  
  return (
    <CTable striped responsive bordered small align="middle">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell className="text-center align-middle">Fecha</CTableHeaderCell>
          <CTableHeaderCell className="text-center align-middle">Plaga</CTableHeaderCell>
          {[...Array(15)].map((_, i) => (
            <CTableHeaderCell key={i} className="text-center align-middle">
              {i + 1}
            </CTableHeaderCell>
          ))}
          <CTableHeaderCell className="text-center align-middle">Fecha Intervención</CTableHeaderCell>
          <CTableHeaderCell className="text-center align-middle">Observaciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {plagasKeys.map(({ key, label }, rowIdx) => (
          <CTableRow key={key}>
            {/* Solo en la primera fila mostramos la Fecha */}
            {rowIdx === 0 && (
              <CTableDataCell rowSpan={plagasKeys.length} className="text-center align-middle">
                {fecha}
              </CTableDataCell>
            )}
            <CTableDataCell className="fw-semibold text-center">{label}</CTableDataCell>
            {plagaData[key].map((val, idx) => (
              <CTableDataCell
                key={idx}
                className={`text-center ${val !== '0' ? 'bg-danger text-white fw-bold' : ''}`}
              >
                {val}
              </CTableDataCell>
            ))}
            {/* Solo en la fila 'trips' agregamos las celdas finales */}
            {key === 'trips' && (
              <>
                <CTableDataCell rowSpan={plagasKeys.length} className="text-center align-middle">
                  {fechaIntervencion}
                </CTableDataCell>
                <CTableDataCell
                  rowSpan={plagasKeys.length}
                  className="text-start align-middle"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {observaciones}
                </CTableDataCell>
              </>
            )}
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default TablaPlagas
