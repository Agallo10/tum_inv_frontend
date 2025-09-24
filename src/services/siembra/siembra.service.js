
import { iotApi } from "../../api/iotApi";

export class SiembraService {
/////////////////////////////////////////////////////////////////////
  static crearSiembra = async(payload)=> {
    // console.log('Payload de crearLabores:', payload);

    try {
      const resp = await iotApi.post('/siembra',payload);
      const datos = resp.data; 
      console.log('Datos de la siembra creada:', datos);
      return{
          ok: true, 
          datos
      }        
  } catch (error) {
      const errorMessage = "No se pudo crear la Siembra";  
      return {
          ok: false,
          errorMessage,
      }       
      
  }

  }

  ///////////////////////////////////////////////////////////////////
    static cargarTodasSiembras = async(id)=> {
    try {
      const resp = await iotApi.get(`/siembra/${id}`);
      const datos = resp.data 
    //  console.log('Datos de la labor creada:', datos);
      return{
          ok: true, 
          datos
      }        
  } catch (error) {
      const errorMessage = "No se pudo crear las Siembras";  
      return {
          ok: false,
          errorMessage,
      }       
      
  }

  }

}



