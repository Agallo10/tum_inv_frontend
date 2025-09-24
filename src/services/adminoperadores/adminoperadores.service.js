
import { iotApi } from "../../api/iotApi";

export class AdminOperadorService {
    static cargarAdminProyectos= async()=>{

        try {
            const resp = await iotApi.get('/adminproyecto');
            const datos = resp.data.asociado;
            //console.log(datos);
            return{
                ok: true, 
                datos
            }        
        } catch (error) {
            const errorMessage = "Los administradores del Proyecto no se pueden cargar";  
            return {
                ok: false,
                errorMessage,
            }       
            
        }
    
    }

///////////////////////////////////////////////////////////////////////////////////////////

}


