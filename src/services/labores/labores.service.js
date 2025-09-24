
import { iotApi } from "../../api/iotApi";

export class LaboresService {
/////////////////////////////////////////////////////////////////////
  static crearLabores = async(payload)=> {
    // console.log('Payload de crearLabores:', payload);

    try {
      const resp = await iotApi.post('/laboresdiarias',payload);
      const datos = resp.data 
    //  console.log('Datos de la labor creada:', datos);
      return{
          ok: true, 
          datos
      }        
  } catch (error) {
      const errorMessage = "No se pudo crear la labor";  
      return {
          ok: false,
          errorMessage,
      }       
      
  }

  }

  ///////////////////////////////////////////////////////////////////
    static cargarTodasLabores = async(id)=> {
    try {
      const resp = await iotApi.get(`/laboresdiarias/${id}`);
      const datos = resp.data 
    //  console.log('Datos de la labor creada:', datos);
      return{
          ok: true, 
          datos
      }        
  } catch (error) {
      const errorMessage = "No se pudo crear la labor";  
      return {
          ok: false,
          errorMessage,
      }       
      
  }

  }

}



