import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SiembraService } from '../../services/siembra/siembra.service';


///////////////////////////////////////////////////////////////
    const siembraApi = (set) => ({    
    siembra: undefined,
///////////////////////////////////////////////////////////////     
    starLoadtSiembras: async ( uid) => {
        try {
          const {ok,datos}= await SiembraService.cargarTodasSiembras(uid);
          // console.log(datos);
                if(!ok){
                  set({siembra:undefined});
                  return false
                }
                  set({siembra:datos});
                  localStorage.setItem('siembra',datos);
                  return datos;

        } catch ( error ) {      
          throw 'Siembra no cargados';
        }
      },
///////////////////////////////////////////////////////////////
      crearSiembra: async (payload) => {
        try {
          console.log('Payload de crearLabores:', payload);
          const {ok,datos}= await SiembraService.crearSiembra(payload);
          // console.log('Datos de la labor creada:', datos);
          console.log('Estado de la creación:', ok);
                if(!ok){  
                  return ok;
                }
                  return ok;

        } catch ( error ) {   
          throw undefined;
        }
      },

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
    });
///////////////////////////////////////////////////////////////
    export const SiembraStore = create()(
      devtools(
        persist(
          siembraApi,
          {name:'siembra' }
        )
      )
    );
/////////////////////////////////////////////////////////////////