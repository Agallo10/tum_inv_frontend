import React, { useEffect } from 'react'


import TabsProyecto from './TabsProyecto';

const Proyecto = () => {
  const nombreproyectoactivo = localStorage.getItem('nombreproyectoactivo');  


  
////////////////////////////////////////////////////////////////////////
useEffect(() => {

}, []);
////////////////////////////////////////////////////////////////////////
///////////////////////////PAGINA PRINCIPAL DEL PROYECTO////////////////////////////////
  return (
    <>

      <TabsProyecto    

        nombreproyectoactivo={nombreproyectoactivo}
      />
      

    </>
  )
}

export default Proyecto
