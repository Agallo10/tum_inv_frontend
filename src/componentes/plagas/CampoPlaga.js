import React, { useState, useEffect } from 'react'
import { CFormInput, CFormSelect, CFormLabel, CCol, CRow } from '@coreui/react-pro'
import { lugares } from './helpers'
import './ColumnVisibilityDropdown.scss'

const CampoPlaga = ({ nombre, label, value, onChange, conLugar = false }) => {
  const [cantidad, setCantidad] = useState('')
  const [lugar, setLugar] = useState('')

  // Cuando entra el valor desde el padre (formData), separa cantidad y lugar
  useEffect(() => {
    if (conLugar && value) {
      const match = value.match(/^(\d*)([A-Z]*)$/i)
      setCantidad(match?.[1] || '')
      setLugar(match?.[2] || '')
    }
  }, [value, conLugar])

  // Combina cantidad y lugar cuando cambian
  useEffect(() => {
    if (conLugar) {
      if (cantidad || lugar) {
        onChange(nombre, `${cantidad}${lugar}`)
      } else {
        onChange(nombre, '')
      }
    }
  }, [cantidad, lugar])

  return (
    <CCol>
      <CFormLabel>{label}</CFormLabel>
      {conLugar ? (
        <CRow className="g-2">
          <CCol>
            <CFormSelect
              className="select-small"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            >
              <option value="">Cantidad</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormSelect
              className="select-small"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
            >
              <option value="">Localiza</option>
              {lugares.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
      ) : (
        <CFormInput
          type="text"
          value={value}
          onChange={(e) => onChange(nombre, e.target.value)}
        />
      )}
    </CCol>
  )
}

export default CampoPlaga
