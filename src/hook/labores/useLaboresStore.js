
import { LaboresStore} from "../../store/index";




export const useLaboresStore = () => {
    //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES  
    
    const crearLabores = LaboresStore(state => state.crearLabores);
    const cargarLabores = LaboresStore(state => state.cargarTodasLabores);
    
    
    /////////////////////////////////////////////////////  
    //////////////////////////////////////////////////////////////// 
    const cargarTodasLabores = async(uid)=>{        
          
        const datos = await cargarLabores(uid);        
        return datos;
      }  
         
    ////////////////////////////////////////////////////////////////   
    const crearLabor= async(payload) => {
      const ok = await crearLabores(payload);      
      // console.log('Estado de la creación:', ok);
      return ok;
    };
    ////////////////////////////////////////////////////////////////   

    ////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////          
      return{       
        cargarLabores,
        crearLabor,
        cargarTodasLabores,
    }   
    ////////////////////////////////////////////////////////////////    
  }