import React, { useEffect, useState } from 'react'
import {
  CSmartTable,
  CCollapse,
  CButton,
  CRow,
  CCol,
} from '@coreui/react-pro'
import TablaPlagas from './TablaPlagas'
import { plagasKeys, AHtiempo } from './helpers'
import { generarPDFPlagas } from './helpers'

const Plagashistory = ({ registros = [] }) => {
  const [filas, setFilas] = useState([])
  const [details, setDetails] = useState([])

  useEffect(() => {
    if (!Array.isArray(registros)) return

    const filasProcesadas = registros.map((registro, index) => {
      const idRegistro = registro.id || `registro-${index}`
      const { formattedDate: fecha } = AHtiempo(registro.fecha)
      const { formattedDate: fechaIntervencion } = AHtiempo(registro.fechaIntervencion)
      return {
        ...registro,
        idRegistro,
        fecha,
        fechaIntervencion,
      }
    })
    setFilas(filasProcesadas)
  }, [registros])

  const toggleDetails = (id) => {
    setDetails((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  const buildPlagaData = (registro) => {
    const base = Array(15).fill('0')
    const plagaData = {}
    plagasKeys.forEach(({ key }) => {
      plagaData[key] = [...base]
    })

    for (let i = 1; i <= 15; i++) {
      const datosArbol = registro.registro?.[i]
      if (!datosArbol) continue
      plagasKeys.forEach(({ key }) => {
        plagaData[key][i - 1] = datosArbol[key] || '0'
      })
    }

    return plagaData
  }

  const tienePlagas = (registro) => {
    return Object.values(registro.registro || {}).some((fila) =>
      Object.values(fila).some((valor) => valor !== '0')
    )
  }

  const descargarIndividual = (registro) => {
    generarPDFPlagas({
      registros: [
        {
          ...registro,
          plagaData: buildPlagaData(registro),
        },
      ],
      titulo: 'Reporte Individual de Plagas',
    })
  }

  const descargarTodos = () => {
    const registrosPDF = filas.map((registro) => ({
      ...registro,
      plagaData: buildPlagaData(registro),
    }))

    generarPDFPlagas({
      registros: registrosPDF,
      titulo: 'Reporte General de Plagas',
    })
  }

  const columnas = [
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
    { key: 'fecha', label: 'Fecha' },
    { key: 'fechaIntervencion', label: 'Fecha Intervención' },
    { key: 'responsable', label: 'Responsable' },
    { key: 'observaciones', label: 'Observaciones' },
  ]

  return (
    <>
      <CRow className="mb-2">
        <CCol>
          <CButton color="success" onClick={descargarTodos}>
            Descargar todos los registros
          </CButton>
        </CCol>
      </CRow>

      <CSmartTable
        items={filas}
        columns={columnas}
        columnFilter
        pagination
        itemsPerPage={5}
        tableProps={{
          striped: true,
          small: true,
          bordered: true,
          responsive: true,
          hover: true,
        }}
        scopedColumns={{
          show_details: (item) => (
            <td className="text-center d-flex gap-2">
              <CButton
                size="sm"
                color={tienePlagas(item) ? 'danger' : 'info'}
                variant="outline"
                onClick={() => toggleDetails(item.idRegistro)}
              >
                {details.includes(item.idRegistro) ? 'Ocultar' : 'Ver'}
              </CButton>
              <CButton
                size="sm"
                color="secondary"
                variant="outline"
                onClick={() => descargarIndividual(item)}
              >
                Descargar
              </CButton>
            </td>
          ),
          details: (item) => (
            <CCollapse visible={details.includes(item.idRegistro)}>
              <TablaPlagas
                plagaData={buildPlagaData(item)}
                fecha={item.fecha}
                fechaIntervencion={item.fechaIntervencion}
                observaciones={item.observaciones}
              />
            </CCollapse>
          ),
        }}
      />
    </>
  )
}

export default Plagashistory
