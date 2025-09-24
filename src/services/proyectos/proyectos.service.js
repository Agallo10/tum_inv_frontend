
import { iotApi } from "../../api/iotApi";

export class ProyectosService {
/////////////////////////////////////////////////////////////////////
  static starLoadallProyecto = async()=> {
      try {
        const resp = await iotApi.get('/proyecto');
      //  console.log(resp);
        const datos = resp.data.Proyectos;
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
static  starnewAdminProyecto= async(value)=>{

    try {
        const resp = await iotApi.post('/adminproyecto',{usuario:value.usuario,proyecto:value.proyecto});
        const data = resp.data
        return{
            ok: true, 
            data
        }        
    } catch (error) {
        const errorMessage = "El token no se puede actualizar";  
        return {
            ok: false,
            errorMessage,
        }       
        
    }
  
  }
/////////////////////////////////////////////////////////////////////
    static starLoadallAdminProyecto= async()=>{

      try {
          const resp = await iotApi.get('/adminproyecto');
          const data = resp.data
          //console.log(data);
          return{
              ok: true, 
              data
          }        
      } catch (error) {
          const errorMessage = "El token no se puede actualizar";  
          return {
              ok: false,
              errorMessage,
          }       
          
      }

    }
///////////////////////////////////////////////////////////////////////////////////////////
  static actualizarAdminProyecto= async(value)=>{
    const id = value.id;
    const usuario = value.usuario;
    const proyecto = value.proyecto;
    try {
        const resp = await iotApi.put(`/adminproyecto/${id}`,{usuario,proyecto});
        const data = resp.data
        return{
            ok: true, 
            data
        }        
    } catch (error) {
        const errorMessage = "El token no se puede actualizar";  
        return {
            ok: false,
            errorMessage,
        }       
        
    }

  }
///////////////////////////////////////////////////////////////////////////////////////////
  static eliminarAdminProyecto= async(id)=>{
    try {
        const resp = await iotApi.delete(`/adminproyecto/${id}`);
        const data = resp.data
        return{
            ok: true, 
            data
        }        
    } catch (error) {
        const errorMessage = "El token no se puede actualizar";  
        return {
            ok: false,
            errorMessage,
        }       
        
    }

  }
///////////////////////////////////////////////////////////////////////////////////////////
static  consumoAcumuProyecto= async(id)=>{
    //console.log(id);
    try {
        const resp = await iotApi.get(`/proyecto/total/${id}`);
        // console.log(resp);
        const datos = resp.data;       
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
///////////////////////////////////////////////////////////////////////////////////////////
static consumoRangototalProyecto= async({projectId,startDate,endDate})=>{
    // console.log({projectId,startDate,endDate});
    try {
        const resp = await iotApi.post(`/consumo/proyecto`,{
            startDate,
            endDate,            
            projectId
        });
        const datos = resp.data;
        // console.log(resp);       
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

static consumoDiarioProyecto= async({projectId, startYear, startMonth,startDay, endYear,endMonth,endDay,categoria,estrato})=>{
   console.log({projectId, startYear, startMonth,startDay, endYear,endMonth,endDay,categoria,estrato});
   try {
       const resp = await iotApi.post(`/consumo/diariox`,{projectId,startYear,startMonth,startDay,endYear,endMonth,endDay,categoria,estrato});
       //console.log(resp.data);
       const datos = resp.data       
       return{
           ok: true, 
           datos
       }        
   } catch (error) {
       const errorMessage = "El consumo no se puede cargar";  
       return {
           ok: false,
           errorMessage,
       }       
       
   }
}
}



