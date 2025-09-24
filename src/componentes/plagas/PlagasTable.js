// src/components/PlagasTable.js
import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CToaster,
  CToast,
  CToastBody,
  CToastHeader,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
import { opcionesResponsable, plagasKeys } from './helpers'
import { usePlagasStore } from '../../hook'
import TablaPlagas from './TablaPlagas'

const PlagasTable = ({ plagas = [] }) => {
  const uid = localStorage.getItem('proyectoactivo')
  const [toastVisible, setToastVisible] = useState(false)
  const { crearPlaga } = usePlagasStore()

  const [formData, setFormData] = useState({
    responsable: '',
  })

  const handleChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  // Inicializar estructura de datos
  const base = Array(15).fill('0')
  const plagaData = {}
  plagasKeys.forEach(({ key }) => {
    plagaData[key] = [...base]
  })

  let fecha = '',
    fechaIntervencion = '',
    observaciones = ''

  plagas.forEach((p) => {
    const i = p.arbolNumero - 1
    plagasKeys.forEach(({ key }) => {
      plagaData[key][i] = p[key] ?? '0'
    })
    fecha = p.fecha
    fechaIntervencion = p.fechaIntervencion
    observaciones = p.observaciones
  })

  const handleGuardar = async () => {
    const registro = {}

    for (let i = 0; i < 15; i++) {
      const arbolNumero = i + 1
      const datosArbol = {}

      plagasKeys.forEach(({ key }) => {
        datosArbol[key] = plagaData[key][i] ?? '0'
      })

      registro[arbolNumero] = datosArbol
    }

    const payload = {
      uid,
      fecha,
      fechaIntervencion,
      registro,
      observaciones,
      responsable: formData.responsable,
    }

    const ok  = await crearPlaga(payload)
    // console.log('🟢 Objeto estructurado para guardar en la base de datos:', ok)

    if (ok) {
      setFormData({ responsable: '' }) // Limpia responsable
      setToastVisible(false)
    }
  }

  useEffect(() => {
    let timeout
    if (toastVisible) {
      timeout = setTimeout(() => setToastVisible(false), 2000)
    }
    return () => clearTimeout(timeout)
  }, [toastVisible])

  return (
    <>
      <CToaster placement="top-end">
        {toastVisible && (
          <CToast color="success" className="text-white" delay={2000}>
            <CToastHeader closeButton={false}>Éxito</CToastHeader>
            <CToastBody>Formulario guardado correctamente</CToastBody>
          </CToast>
        )}
      </CToaster>

      <CCard>
        <CCardHeader className="fw-bold d-flex justify-content-between align-items-center">
          <span>Formulario de Plagas</span>
          <div className="d-flex align-items-end gap-2">
            <div className="d-flex flex-column">
              <CFormLabel className="mb-1">Responsable</CFormLabel>
              <CFormSelect
                size="sm"
                value={formData.responsable}
                onChange={(e) => handleChange('responsable', e.target.value)}
              >
                <option value="">Seleccione</option>
                {opcionesResponsable.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div>
              <CButton
                color="success"
                size="sm"
                className="mt-4"
                onClick={handleGuardar}
                disabled={!formData.responsable || !fecha}
              >
                Guardar Formulario
              </CButton>
            </div>
          </div>
        </CCardHeader>

        <CCardBody>
          <TablaPlagas
            plagaData={plagaData}
            fecha={fecha}
            fechaIntervencion={fechaIntervencion}
            observaciones={observaciones}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default PlagasTable
