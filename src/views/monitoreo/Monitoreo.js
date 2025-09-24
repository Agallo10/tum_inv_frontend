import React, { useEffect } from 'react'
import TabsMonitoreo from './TabsMonitoreo'

const Monitoreo = () => {
  const nombreproyectoactivo = localStorage.getItem('nombreproyectoactivo');  
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
  
  }, []);
  return (
    <>
    <TabsMonitoreo/>

    </>
  )
}
export default Monitoreo