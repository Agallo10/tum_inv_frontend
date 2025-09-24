
import { CCard, CCardBody,CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react-pro';
import { LaboresDiarias,Riego,Siembra,Plagas } from '../../componentes';
import MonitoreoSanidad from '../../componentes/monitoreo/MonitoreoEnfermedades';
// import {ContenedorPlagas} from '../../componentes/plagas/ContenedorPlagas';
//import PlagasTable from '../../componentes/plagas/PlagasTable';


const TabsProyecto = () => {

  return (    
  <>
             
    <CCard>
      <CCardBody>
        <CTabs activeItemKey="censoplagas">
          <CTabList variant="tabs">
            <CTab itemKey="labores">Labores Diarias</CTab>
            <CTab itemKey="siembra">Siembra y Plantación</CTab>
            <CTab itemKey="riego">Riego</CTab>
            <CTab itemKey="censoplagas">Censo Plagas</CTab>
            <CTab itemKey="monitoreo">Monitoreo Enfermedades</CTab>
          </CTabList>

          <CTabContent>

          <CTabPanel className="p-1" itemKey="labores">                    
              <LaboresDiarias/>                                   
          </CTabPanel>

           <CTabPanel className="p-3" itemKey="siembra">
                <CCard className="mb-4" style={{ height: '600px', overflowY: 'auto' }}>
                  <CCardBody style={{ height: '100%' }}>     
        
                    <Siembra/>

                  </CCardBody>
                </CCard>     
           </CTabPanel>

            <CTabPanel className="p-3" itemKey="riego">
                <CCard className="mb-4" style={{ height: '600px', overflowY: 'auto' }}>
                  <CCardBody style={{ height: '100%' }}>     
                      <Riego/>

                  </CCardBody>
                </CCard>

            </CTabPanel>

            
            <CTabPanel className="p-3" itemKey="censoplagas">
                  <CCardBody style={{ height: '100%', maxHeight: '600px', overflowY: 'auto' }}>           
                         <Plagas/>
                  </CCardBody>
            </CTabPanel>


            <CTabPanel className="p-3" itemKey="monitoreo">
                  <CCardBody style={{ height: '100%', maxHeight: '600px', overflowY: 'auto' }}>           
                        <MonitoreoSanidad/> 
                  </CCardBody>
            </CTabPanel>

          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>  

    </>
  )
}

export default TabsProyecto


