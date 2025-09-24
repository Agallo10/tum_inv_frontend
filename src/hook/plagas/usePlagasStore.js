
import { PlagasStore} from "../../store/index";

export const usePlagasStore = () => {
    //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES  
    
    const crearPlagas = PlagasStore(state => state.crearPlagas);
    const starLoadtPlagas = PlagasStore(state => state.starLoadtPlagas);
    
    
    /////////////////////////////////////////////////////  
    //////////////////////////////////////////////////////////////// 
    const cargarTodasPlagas = async(uid)=>{        
          
        const datos = await starLoadtPlagas(uid);        
        return datos;
      }  
         
    ////////////////////////////////////////////////////////////////   
    const crearPlaga= async(payload) => {
      const ok = await crearPlagas(payload);      
      // console.log('Estado de la creación:', ok);
      return ok;
    };
    ////////////////////////////////////////////////////////////////   

    ////////////////////////////////////////////////////////////////  
    ////////////////////////////////////////////////////////////////          
      return{
        crearPlaga,
        cargarTodasPlagas,
    }   
    ////////////////////////////////////////////////////////////////    
  }