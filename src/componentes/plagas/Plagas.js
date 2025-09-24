import React, { useState } from 'react'
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CButton,
  CPopover,
} from '@coreui/react-pro'
import { getFechaActual } from './helpers'
import ContenedorPlagas from './ContenedorPlagas'
import CampoPlaga from './CampoPlaga'

const Plagas = () => {
  const [formData, setFormData] = useState({
    fecha: getFechaActual(),
    arbolNumero: 1,
    trips: '0',
    moscaOvario: '0',
    acaros: '0',
    otrosInsectos: '0',
    botrytis: '0',
    phomosis: '0',
    roña: '0',
    otrosHongos: '0',
    fusarium: '0',
    fechaIntervencion: getFechaActual(),
    observaciones: '',
    responsable: '',
  })

  const [plagas, setPlagas] = useState([])
  const [showPopover, setShowPopover] = useState(false)

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevaObservacion = formData.observaciones.trim()
    const ultima = plagas.at(-1)

    const observacionesAcumuladas = ultima
      ? nuevaObservacion
        ? `${ultima.observaciones}\n● Árbol ${formData.arbolNumero}: ${nuevaObservacion}`
        : ultima.observaciones
      : nuevaObservacion
        ? `● Árbol ${formData.arbolNumero}: ${nuevaObservacion}`
        : ''

    setPlagas((prev) => [
      ...prev,
      {
        ...formData,
        observaciones: observacionesAcumuladas,
      },
    ])

    setFormData({
      ...formData,
      arbolNumero: 1,
      trips: '0',
      moscaOvario: '0',
      acaros: '0',
      otrosInsectos: '0',
      botrytis: '0',
      phomosis: '0',
      roña: '0',
      otrosHongos: '0',
      fusarium: '0',
      fechaIntervencion: getFechaActual(),
      observaciones: '',
      responsable: '',
    })

    setShowPopover(true)
    setTimeout(() => setShowPopover(false), 2000)
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="p-3 border rounded shadow-sm bg-light">
        <CRow className="mb-4">
          <CCol md={2}>
            <CFormLabel>Fecha</CFormLabel>
            <CFormInput
              type="date"
              value={formData.fecha}
              onChange={(e) => handleChange('fecha', e.target.value)}
            />
          </CCol>
          <CCol md={2}>
            <CFormLabel>Árbol N°</CFormLabel>
            <CFormInput
              type="number"
              min={1}
              max={15}
              value={formData.arbolNumero}
              onChange={(e) => handleChange('arbolNumero', e.target.value)}
            />
          </CCol>
          <CCol md={2}>
            <CFormLabel>Fusarium oxysporum</CFormLabel>
            <CFormInput
              value={formData.fusarium}
              onChange={(e) => handleChange('fusarium', e.target.value)}
            />
          </CCol>
          <CCol md={2}>
            <CFormLabel>Fecha intervención</CFormLabel>
            <CFormInput
              type="date"
              value={formData.fechaIntervencion}
              onChange={(e) => handleChange('fechaIntervencion', e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mb-4">
          <CCol md={4}>
            <div className="p-3 border rounded shadow-sm bg-light h-100">
              <h6 className="fw-bold mb-3">Insectos, ácaros, moluscos, etc.</h6>
              <CRow className="mb-3">
                <CampoPlaga
                  nombre="trips"
                  label="Trips"
                  value={formData.trips}
                  onChange={handleChange}
                  conLugar={true}
                />
                <CampoPlaga
                  nombre="moscaOvario"
                  label="Mosca del ovario"
                  value={formData.moscaOvario}
                  onChange={handleChange}
                  conLugar={true}
                />
              </CRow>
              <CRow>
                <CampoPlaga
                  nombre="acaros"
                  label="Ácaros"
                  value={formData.acaros}
                  onChange={handleChange}
                  conLugar={true}
                />
                <CampoPlaga
                  nombre="otrosInsectos"
                  label="Otros (Insectos)"
                  value={formData.otrosInsectos}
                  onChange={handleChange}

                />
              </CRow>
            </div>
          </CCol>

          <CCol md={4}>
            <div className="p-3 border rounded shadow-sm bg-light h-100">
              <h6 className="fw-bold mb-3">Hongos, bacterias, virus, etc.</h6>
              <CRow className="mb-3">
                <CampoPlaga
                  nombre="botrytis"
                  label="Botrytis"
                  value={formData.botrytis}
                  onChange={handleChange}
                  conLugar={true}
                />
                <CampoPlaga
                  nombre="phomosis"
                  label="Phomosis"
                  value={formData.phomosis}
                  onChange={handleChange}
                  conLugar={true}
                />
              </CRow>
              <CRow>
                <CampoPlaga
                  nombre="roña"
                  label="Roña"
                  value={formData.roña}
                  onChange={handleChange}
                  conLugar={true}
                />
                <CampoPlaga
                  nombre="otrosHongos"
                  label="Otros (Hongos)"
                  value={formData.otrosHongos}
                  onChange={handleChange}
                />
              </CRow>
            </div>
          </CCol>

          <CCol md={4}>
            <div className="p-3 border rounded shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
              <div>
                <h6 className="fw-bold mb-3">Observaciones Individuales</h6>
                <CFormTextarea
                  rows={6}
                  value={formData.observaciones}
                  onChange={(e) => handleChange('observaciones', e.target.value)}
                  style={{ height: '80px' }}
                />
              </div>

              <CRow className="mt-3">
                <CCol md={5} className="d-flex align-items-end justify-content-end">
                  <CPopover
                    content="Diagnóstico agregado correctamente"
                    placement="top"
                    visible={showPopover}
                  >
                    <CButton type="submit" color="primary">
                      Agregar Diagnóstico
                    </CButton>
                  </CPopover>
                </CCol>
              </CRow>
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <ContenedorPlagas plagas={plagas} />
          </CCol>
        </CRow>
      </div>
    </CForm>
  )
}

export default Plagas
