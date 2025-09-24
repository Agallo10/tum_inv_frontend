import React, { useState } from 'react'
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CButton,
  CFormSelect,
  CPopover,
} from '@coreui/react-pro'
import { opcionesFenologico, opcionesFitosanitario } from './helpers'

const getFechaActual = () => {
  const hoy = new Date()
  const year = hoy.getFullYear()
  const month = String(hoy.getMonth() + 1).padStart(2, '0')
  const day = String(hoy.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const MonitoreoFitosanitario = () => {
  const [formData, setFormData] = useState({
    fecha: getFechaActual(),
    lote: '',
    estadoFenologico: '',
    problemaFitosanitario: '',
    plantasEvaluadas: '',
    plantasAfectadas: '',
  })

  const [showPopover, setShowPopover] = useState(false)

  const handleChange = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Aquí podrías enviar a una base de datos si lo necesitas

    // Limpiar el formulario
    setFormData({
      fecha: getFechaActual(),
      lote: '',
      estadoFenologico: '',
      problemaFitosanitario: '',
      plantasEvaluadas: '',
      plantasAfectadas: '',
    })

    setShowPopover(true)
    setTimeout(() => setShowPopover(false), 2000)
  }

  const calcularIncidencia = () => {
    const evaluadas = parseFloat(formData.plantasEvaluadas)
    const afectadas = parseFloat(formData.plantasAfectadas)

    if (!isNaN(evaluadas) && evaluadas > 0 && !isNaN(afectadas)) {
      return ((afectadas / evaluadas) * 100).toFixed(2)
    }

    return ''
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="p-3 border rounded shadow-sm bg-light">
        <CRow className="mb-3">
          <CCol md={3}>
            <CFormLabel>Fecha</CFormLabel>
            <CFormInput
              type="date"
              value={formData.fecha}
              onChange={(e) => handleChange('fecha', e.target.value)}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel>Lote</CFormLabel>
            <CFormInput
              type="number"
              min={1}
              value={formData.lote}
              onChange={(e) => handleChange('lote', e.target.value)}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel>Estado Fenológico</CFormLabel>
            <CFormSelect
              value={formData.estadoFenologico}
              onChange={(e) => handleChange('estadoFenologico', e.target.value)}
            >
              <option value="">Seleccione</option>
              {opcionesFenologico.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CFormLabel>Problema Fitosanitario</CFormLabel>
            <CFormSelect
              value={formData.problemaFitosanitario}
              onChange={(e) => handleChange('problemaFitosanitario', e.target.value)}
            >
              <option value="">Seleccione</option>
              {opcionesFitosanitario.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={3}>
            <CFormLabel>Total Plantas Evaluadas (A)</CFormLabel>
            <CFormInput
              type="number"
              min={1}
              value={formData.plantasEvaluadas}
              onChange={(e) => handleChange('plantasEvaluadas', e.target.value)}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel>Total Plantas Afectadas (B)</CFormLabel>
            <CFormInput
              type="number"
              value={formData.plantasAfectadas}
              onChange={(e) => handleChange('plantasAfectadas', e.target.value)}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel>% Incidencia (B/A × 100)</CFormLabel>
            <CFormInput
              value={calcularIncidencia()}
              readOnly
              plaintext
            />
          </CCol>
          <CCol md={3} className="d-flex align-items-end justify-content-end">
            <CPopover
              content="Registro guardado"
              placement="top"
              visible={showPopover}
            >
              <CButton type="submit" color="success">
                Agregar Registro
              </CButton>
            </CPopover>
          </CCol>
        </CRow>
      </div>
    </CForm>
  )
}

export default MonitoreoFitosanitario
