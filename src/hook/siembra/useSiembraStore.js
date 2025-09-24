
import { SiembraStore} from "../../store/index";

export const useSiembraStore = () => {
    //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES  
    
    const crearSiembras = SiembraStore(state => state.crearSiembra);
    const starLoadtSiembras = SiembraStore(state => state.starLoadtSiembras);
    
    
    /////////////////////////////////////////////////////  
    //////////////////////////////////////////////////////////////// 
    const cargarTodasSiembras = async(uid)=>{        
          
        const datos = await starLoadtSiembras(uid);        
        return datos;
      }  
         
    ////////////////////////////////////////////////////////////////   
    const crearSiembra= async(payload) => {
      const ok = await crearSiembras(payload);      
      // console.log('Estado de la creación:', ok);
      return ok;
    };
    ////////////////////////////////////////////////////////////////   

    ////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////          
      return{
        crearSiembra,
        cargarTodasSiembras,
    }   
    ////////////////////////////////////////////////////////////////    
  }