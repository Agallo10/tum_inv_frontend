import { CCard, CCardBody,CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react-pro';


const TabsMonitoreo = (nombreproyectoactivo) => {

  return (    
  <>
             
    <CCard>
      <CCardBody>
        <CTabs activeItemKey="esquema">
          <CTabList variant="tabs">
            <CTab itemKey="esquema">esquema</CTab>
            <CTab itemKey="graficaconsumo">graficaconsumogeneral</CTab>
            <CTab itemKey="dispositivos">dispositivos</CTab>
            <CTab itemKey="tablaconsumo">consumogeneral</CTab>
          </CTabList>

          <CTabContent>

          <CTabPanel className="p-3" itemKey="esquema">
                                               
            </CTabPanel>

            <CTabPanel className="p-3" itemKey="graficaconsumo">
              <CCard className="mb-4" style={{ height: '750px', overflowY: 'auto' }}>
                <CCardBody style={{ height: '100%' }}>     


                </CCardBody>
                </CCard>     
            </CTabPanel>

            <CTabPanel className="p-3" itemKey="dispositivos">



            </CTabPanel>


            
            <CTabPanel className="p-3" itemKey="tablaconsumo">
                <CCard className="mb-4" style={{ height: '550px', overflow: 'hidden' }}>
                  <CCardBody style={{ height: '100%', maxHeight: '500px', overflowY: 'auto' }}>           

                  </CCardBody>
                </CCard>              
            </CTabPanel>

          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>  

    </>
  )
}

export default TabsMonitoreo

