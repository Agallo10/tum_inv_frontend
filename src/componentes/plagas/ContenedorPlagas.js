import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react-pro'
import PlagasTable from './PlagasTable'
import Plagashistory from './Plagashistory'
import { usePlagasStore } from '../../hook'
const ContenedorPlagas = ({ plagas = [] }) => {
  const [activeTab, setActiveTab] = useState('diagnostico');
  const [historial, setHistorial] = useState();
  const uid = localStorage.getItem('proyectoactivo')
  const { cargarTodasPlagas } = usePlagasStore()

////////////////////////////////////////////////////
    const datos =async()=>{
      // console.log(uid);
        const {registros} = await cargarTodasPlagas(uid);
        console.log(registros);
        setHistorial(registros);
    }

////////////////////////////////////////////////////
  useEffect(() => {
    datos();

  }, [plagas])
  
  return (
    <CCard>
      <CCardHeader className="fw-bold">Diagnóstico de Plagas</CCardHeader>
      <CCardBody>
        <CTabs activeItemKey={activeTab} onActiveItemChange={setActiveTab}>
          <CTabList variant="tabs">
            <CTab itemKey="diagnostico">Diagnóstico</CTab>
            <CTab itemKey="historial">Historial</CTab>
          </CTabList>

          <CTabContent className="mt-3">
            <CTabPanel itemKey="diagnostico">
              <PlagasTable plagas={plagas} />
            </CTabPanel>
            <CTabPanel itemKey="historial">
              <Plagashistory registros={historial} />
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>
  )
}

export default ContenedorPlagas
