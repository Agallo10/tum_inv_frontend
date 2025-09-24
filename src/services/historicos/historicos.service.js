import { iotApi } from "../../api/iotApi";

export class HistoricosService {
///////////////////////////////////////////////////////////////////////////////////////////
static loadMedidorAlarmaHistory= async({dispositivo,provedorid})=>{
    // console.log(dispositivo);
    // console.log(provedorid);
    try {
        const resp = await iotApi.get(`/${provedorid}/hist/${dispositivo}/1000`);       
        const datos = resp.data.data;   
        // console.log(datos);

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
//////////////////////////////////////////////////////////////////////////////////////////////////
static loadDaotosHistory= async({idProyecto,startData,endData})=>{
    // console.log(dispositivo);
    // console.log(provedorid);
    try {
        const resp = await iotApi.get(`/consumo/reporte/${idProyecto}/${startData}/${endData}`);       
        const datos = resp.data.data;   
        // console.log(datos);

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
//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

}



