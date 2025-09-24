
import { iotApi } from "../../api/iotApi";

export class OperadorService {
    static cargarOperadores= async()=>{

        try {
            const resp = await iotApi.get('/operador');
            const datos = resp.data.Operadores;
            //console.log(datos);
            return{
                ok: true, 
                datos
            }        
        } catch (error) {
            const errorMessage = "El operador no se puede cargar";  
            return {
                ok: false,
                errorMessage,
            }       
            
        }
    
    }

///////////////////////////////////////////////////////////////////////////////////////////
static crearOperador= async({nombre})=>{
    
    try {
        const resp = await iotApi.post('/operador/',{nombre});
        const data = resp.data
        return{
            ok: true, 
            data
        }        
    } catch (error) {
        const errorMessage = "El operador no se puede cargar";  
        return {
            ok: false,
            errorMessage,
        }       
        
    }    
}

}



