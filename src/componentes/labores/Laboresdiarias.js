import React, { useState, useEffect } from 'react'
import {
  CForm,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CButton,
  CMultiSelect,
  CFormFeedback,
} from '@coreui/react-pro'

import {
  getFechaActual,
  opcionesLabores,
  calcularCostoTotal,
  validarFormulario,
  construirPayload,
} from './helpers'
import { useLaboresStore } from '../../hook'
import LaboresTable from './LaboresTable'

const LaboresDiarias = () => {
  const { crearLabor, cargarTodasLabores } = useLaboresStore()
  const uid = localStorage.getItem('proyectoactivo')
  const fechaHoy = getFechaActual()

  const initialState = {
    fecha: fechaHoy,
    nJornales: '',
    costoJornales: '',
    labores: [],
    insumo: '',
    costoMateriales: '',
    observaciones: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [costoTotal, setCostoTotal] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [labores, setLabores] = useState([])
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([])

  useEffect(() => {
    setCostoTotal(
      calcularCostoTotal(
        formData.nJornales,
        formData.costoJornales,
        formData.costoMateriales
      )
    )
  }, [formData.nJornales, formData.costoJornales, formData.costoMateriales])

const handleSubmit = async (e) => {
  e.preventDefault()
  const validationErrors = validarFormulario(formData)
  setErrors(validationErrors)

  if (Object.keys(validationErrors).length === 0) {
    setEnviando(true)

    const laboresSeleccionadas = Array.isArray(formData.labores)
      ? formData.labores
          .map((item) => (typeof item === 'string' ? item : item.value))
          .join(', ')
      : ''

    console.log(laboresSeleccionadas)

    const payload = construirPayload(
      { ...formData, 
      laborRealizada: laboresSeleccionadas }, // ✅ aquí el cambio correcto
      costoTotal,
      uid,
      fechaHoy
    )

    // console.log(payload)
    await crearLabor(payload)
    resetFormData()
    setEnviando(false)
    cargaLabores()
  }
}


  const resetFormData = () => {
    setFormData(initialState)
    setErrors({})
    setCategoriasSeleccionadas([])
  }

  const cargaLabores = async () => {
    const { labores } = await cargarTodasLabores(uid)
    setLabores(labores)
  }

  useEffect(() => {
    if (!uid) return
    cargaLabores()
  }, [uid])

  const actividadesFiltradas = opcionesLabores
    .filter((g) => categoriasSeleccionadas.includes(g.label))
    .flatMap((g) => g.options)

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
                <CFormLabel>Número de Jornales</CFormLabel>
                <CFormInput
                  type="number"
                  min={0}
                  value={formData.nJornales}
                  onChange={(e) =>
                    setFormData({ ...formData, nJornales: e.target.value })
                  }
                  invalid={!!errors.nJornales}
                />
                <CFormFeedback invalid>{errors.nJornales}</CFormFeedback>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Costo por Jornal ($)</CFormLabel>
                <CInputGroup>
                  <CInputGroupText>$</CInputGroupText>
                  <CFormInput
                    type="number"
                    min={0}
                    value={formData.costoJornales}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costoJornales: e.target.value,
                      })
                    }
                    invalid={!!errors.costoJornales}
                  />
                </CInputGroup>
                <CFormFeedback invalid>{errors.costoJornales}</CFormFeedback>
              </CCol>
              <CCol>
                <CFormLabel>Categorías</CFormLabel>
                <CMultiSelect
                  options={opcionesLabores.map((g) => ({
                    value: g.label,
                    label: g.label,
                  }))}
                  selectionType="tags"
                  value={categoriasSeleccionadas.map((cat) => ({
                    value: cat,
                    label: cat,
                  }))}
                  onChange={(selected) => {
                    const seleccionadas = selected.map((s) => s.value)
                    setCategoriasSeleccionadas(seleccionadas)

                    const nuevasOpciones = opcionesLabores
                      .filter((g) => seleccionadas.includes(g.label))
                      .flatMap((g) => g.options)

                    setFormData((prev) => ({
                      ...prev,
                      labores: prev.labores.filter((l) =>
                        nuevasOpciones.some((opt) => opt.value === (l?.value || l))
                      ),
                    }))
                  }}
                  text="Selecciona categorías de labores"
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CFormLabel>Labores Realizadas</CFormLabel>
                <CMultiSelect
                  options={actividadesFiltradas}
                  selectionType="tags"
                  value={formData.labores}
                  onChange={(selected) =>
                    setFormData({ ...formData, labores: selected })
                  }
                  disabled={categoriasSeleccionadas.length === 0}
                  text="Selecciona labores"
                />
                {errors.labores && (
                  <small className="text-danger d-block">
                    {errors.labores}
                  </small>
                )}
              </CCol>
            </CRow>
          </div>
        </CCol>

        <CCol md={6}>
          <div className="p-2 border rounded shadow-sm bg-light h-100 d-flex flex-column justify-content-between">
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Insumo o Material</CFormLabel>
                <CFormInput
                  value={formData.insumo}
                  placeholder="Ej: Fertilizante, Aceite X"
                  onChange={(e) =>
                    setFormData({ ...formData, insumo: e.target.value })
                  }
                />
              </CCol>
              <CCol>
                <CFormLabel>Costo Materiales ($)</CFormLabel>
                <CInputGroup>
                  <CInputGroupText>$</CInputGroupText>
                  <CFormInput
                    type="number"
                    min={0}
                    value={formData.costoMateriales}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costoMateriales: e.target.value,
                      })
                    }
                  />
                </CInputGroup>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Observaciones</CFormLabel>
                <CFormTextarea
                  rows={2}
                  placeholder="Ej: Ninguna"
                  value={formData.observaciones}
                  onChange={(e) =>
                    setFormData({ ...formData, observaciones: e.target.value })
                  }
                />
              </CCol>
            </CRow>

            <CRow className="align-items-end">
              <CCol>
                <CFormLabel className="fw-bold">Costo Total ($)</CFormLabel>
                <CInputGroup>
                  <CInputGroupText>$</CInputGroupText>
                  <CFormInput value={costoTotal} readOnly />
                </CInputGroup>
              </CCol>
              <CCol className="text-end">
                <CButton
                  type="submit"
                  color="primary"
                  disabled={
                    enviando ||
                    !formData.labores.length ||
                    !formData.nJornales ||
                    !formData.costoJornales ||
                    !!errors.nJornales ||
                    !!errors.costoJornales
                  }
                >
                  {enviando ? 'Guardando...' : 'Guardar Labor'}
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <LaboresTable labores={labores} />
        </CCol>
      </CRow>
    </CForm>
  )
}

export default LaboresDiarias
