import React, { useState, useEffect } from 'react'
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CButton,
  CFormFeedback,
  CCard,
  CCardBody,
  CFormSelect,
} from '@coreui/react-pro'

import {
  getFechaActual,
  validarFormularioRiego,
  construirPayloadRiego,
  calcularAguaTotal,
  opcionesRiego,
} from './helpers'

import RiegoTable from './RiegoTable'
import { useRiegoStore } from '../../hook'

const Riego = () => {
  const { crearRiego, cargarTodosRiegos } = useRiegoStore()
  const uid = localStorage.getItem('proyectoactivo')
  const fechaHoy = getFechaActual()

  const initialState = {
    fecha: fechaHoy,
    lote: '',
    sistema: '',
    numeroPlantas: '',
    requerimientoArbol: '',
    tiempoRiego: '',
    descargaDifusor: '',
    aguaTotalLitros: '',
    observaciones: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [riegos, setRiegos] = useState([])

  // Auto cálculo de Agua Total (L)
  useEffect(() => {
    const { numeroPlantas, tiempoRiego, descargaDifusor } = formData
    const total = calcularAguaTotal(numeroPlantas, tiempoRiego, descargaDifusor)
    setFormData((prev) => ({
      ...prev,
      aguaTotalLitros: total,
    }))
  }, [formData.numeroPlantas, formData.tiempoRiego, formData.descargaDifusor])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validarFormularioRiego(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true)
      const payload = construirPayloadRiego(formData, uid, fechaHoy)
      await crearRiego(payload)
      // resetFormData()
      setEnviando(false)
      cargaRiegos()
    }
  }

  const resetFormData = () => {
    setFormData(initialState)
    setErrors({})
  }

  const isSubmitDisabled =
    enviando ||
    !formData.sistema ||
    !formData.numeroPlantas ||
    !formData.aguaTotalLitros ||
    !!errors.numeroPlantas ||
    !!errors.aguaTotalLitros

  const cargaRiegos = async () => {
    const { riegos } = await cargarTodosRiegos(uid)
    setRiegos(riegos)
  }

  useEffect(() => {
    if (!uid) return
    cargaRiegos()
  }, [uid])

  return (
    <CForm className="p-1" onSubmit={handleSubmit}>
      <CRow className="mb-4">
        <CCol md={6}>
          <div className="p-3 border rounded shadow-sm bg-light h-100">
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Fecha</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fecha}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Lote</CFormLabel>
                <CFormInput
                  type="number"
                  min={1}
                  value={formData.lote}
                  onChange={(e) =>
                    setFormData({ ...formData, lote: e.target.value })
                  }
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CFormLabel>Sistema</CFormLabel>
                <CFormSelect
                  value={formData.sistema}
                  onChange={(e) =>
                    setFormData({ ...formData, sistema: e.target.value })
                  }
                >
                  <option value="">Selecciona un sistema</option>
                  {opcionesRiego[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Número de Plantas</CFormLabel>
                <CFormInput
                  type="number"
                  value={formData.numeroPlantas}
                  onChange={(e) =>
                    setFormData({ ...formData, numeroPlantas: e.target.value })
                  }
                  invalid={!!errors.numeroPlantas}
                />
                <CFormFeedback invalid>{errors.numeroPlantas}</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Requerimiento/Árbol (L)</CFormLabel>
                <CFormInput
                  type="number"
                  value={formData.requerimientoArbol}
                  onChange={(e) =>
                    setFormData({ ...formData, requerimientoArbol: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Tiempo de Riego (min)</CFormLabel>
                <CFormInput
                  type="number"
                  value={formData.tiempoRiego}
                  onChange={(e) =>
                    setFormData({ ...formData, tiempoRiego: e.target.value })
                  }
                />
              </CCol>
            </CRow>
          </div>
        </CCol>

        <CCol md={6}>
          <div className="p-3 border rounded shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Descarga Difusor (L)</CFormLabel>
                <CFormInput
                  type="number"
                  value={formData.descargaDifusor}
                  onChange={(e) =>
                    setFormData({ ...formData, descargaDifusor: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Agua Total (L)</CFormLabel>
                <CFormInput
                  type="number"
                  value={formData.aguaTotalLitros}
                  readOnly
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Observaciones</CFormLabel>
                <CFormTextarea
                  rows={2}
                  value={formData.observaciones}
                  onChange={(e) =>
                    setFormData({ ...formData, observaciones: e.target.value })
                  }
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol className="text-end">
                <CButton type="submit" color="success" disabled={isSubmitDisabled}>
                  {enviando ? 'Guardando...' : 'Guardar Riego'}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <RiegoTable riegos={riegos} />
        </CCol>
      </CRow>
    </CForm>
  )
}

export default Riego
