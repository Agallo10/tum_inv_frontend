
import { iotApi } from "../../api/iotApi";

export class ClientesService {
/////////////////////////////////////////////////////////////////////
  static cargarClientes = async()=> {

    try {
      const resp = await iotApi.get('/cliente');
      const datos = resp.data
     
      return{
          ok: true, 
          datos
      }        
  } catch (error) {
      const errorMessage = "El token no se puede actualizar";  
      return {
          ok: false,
          errorMessage,
      }       
      
  }

  }
//Falta el check-satatus
/////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
}



