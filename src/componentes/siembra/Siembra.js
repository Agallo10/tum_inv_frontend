import React, { useState, useEffect } from 'react'
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CFormSelect,
  CButton,
} from '@coreui/react-pro'

import { useSiembraStore } from '../../hook'
import {
  getFechaActual,
  validarFormularioSiembra,
  construirPayloadSiembra,
  opcionesCultivo,
  opcionesVariedad,
  opcionesOperario
} from './helpers'

import SiembrasTable from './SiembrasTable'

const Siembra = () => {
  const { crearSiembra, cargarTodasSiembras } = useSiembraStore()
  const uid = localStorage.getItem('proyectoactivo')
  const fechaHoy = getFechaActual()

  const initialState = {
    fecha: fechaHoy,
    lote: '',
    variedad: '',
    patron: '',
    proveedorMaterial: '',
    numeroPlantulas: '',
    siembraNueva: '',
    resiembra: '',
    distanciaCalle: '',
    distanciaPlanta: '',
    operario: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [siembras, setSiembras] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validarFormularioSiembra(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setEnviando(true)
      const payload = construirPayloadSiembra(formData, uid, fechaHoy)
      await crearSiembra(payload)
      resetFormData()
      setEnviando(false)
      cargaSiembras()
    }
  }

  const resetFormData = () => {
    setFormData(initialState)
    setErrors({})
  }

  const isSubmitDisabled =
    enviando ||
    !formData.variedad ||
    !formData.numeroPlantulas ||
    !formData.operario ||
    !!errors.numeroPlantulas ||
    !!errors.operario

  const cargaSiembras = async () => {
    const { siembras } = await cargarTodasSiembras(uid)
    console.log(siembras)
    setSiembras(siembras)
  }

  useEffect(() => {
    if (!uid) return
    cargaSiembras()
  }, [uid])

  return (
    <CForm className="p-1" onSubmit={handleSubmit}>
      <CRow className="mb-4">
        {/* 🟩 Columna 1 */}
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
                <CFormLabel>Variedad</CFormLabel>
                <CFormSelect
                  value={formData.variedad}
                  onChange={(e) =>
                    setFormData({ ...formData, variedad: e.target.value })
                  }
                >
                  <option value="">Selecciona una variedad</option>
                  {opcionesCultivo[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Patrón</CFormLabel>
                <CFormSelect
                  value={formData.patron}
                  onChange={(e) =>
                    setFormData({ ...formData, patron: e.target.value })
                  }
                >
                  <option value="">Selecciona un patrón</option>
                  {opcionesVariedad[0].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol>
                <CFormLabel>Proveedor de Material</CFormLabel>
                <CFormInput
                  value={formData.proveedorMaterial}
                  onChange={(e) =>
                    setFormData({ ...formData, proveedorMaterial: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel># Plántulas Sembradas</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.numeroPlantulas}
                  onChange={(e) =>
                    setFormData({ ...formData, numeroPlantulas: e.target.value })
                  }
                  invalid={!!errors.numeroPlantulas}
                />
                <CFormFeedback invalid>{errors.numeroPlantulas}</CFormFeedback>
              </CCol>
            </CRow>
          </div>
        </CCol>

        {/* 🟦 Columna 2 */}
        <CCol md={6}>
          <div className="p-3 border rounded shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            <CRow className="mb-3">
              <CCol>
                <CFormLabel># Siembra Nueva</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.siembraNueva}
                  onChange={(e) =>
                    setFormData({ ...formData, siembraNueva: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel># Resiembra</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.resiembra}
                  onChange={(e) =>
                    setFormData({ ...formData, resiembra: e.target.value })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Distancia Calle (m)</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.distanciaCalle}
                  onChange={(e) =>
                    setFormData({ ...formData, distanciaCalle: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Distancia Planta (m)</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.distanciaPlanta}
                  onChange={(e) =>
                    setFormData({ ...formData, distanciaPlanta: e.target.value })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="align-items-end">
              <CCol>
                <CFormLabel>Operario Encargado</CFormLabel>
                <CFormSelect
                  value={formData.operario}
                  onChange={(e) =>
                    setFormData({ ...formData, operario: e.target.value })
                  }
                  invalid={!!errors.operario}
                >
                  {opcionesOperario.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>{errors.operario}</CFormFeedback>
              </CCol>

              <CCol className="text-end">
                <CButton type="submit" color="success" disabled={isSubmitDisabled}>
                  {enviando ? 'Guardando...' : 'Guardar Siembra'}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <SiembrasTable siembras={siembras} />
        </CCol>
      </CRow>
    </CForm>
  )
}

export default Siembra
