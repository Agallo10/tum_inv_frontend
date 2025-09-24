import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PlagasService } from '../../services/plagas/plagas.service';
///////////////////////////////////////////////////////////////
    const plagasApi = (set) => ({    
    plagas: undefined,      
      starLoadtPlagas: async (id) => {
        try {
          const {ok,datos}= await PlagasService.cargarTodasPlagas(id);
                if(!ok){
                  set({plagas:undefined});
                  return false
                }
                  set({plagas:datos});
                  localStorage.setItem('plagas',datos);
                  return datos;

        } catch ( error ) {   
          throw undefined;
        }
      },
///////////////////////////////////////////////////////////////
      crearPlagas: async (payload) => {
        try {
          // console.log('Payload de crearLabores:', payload);
          const {ok,datos}= await PlagasService.crearPlagas(payload);
          console.log('Datos de la labor creada:', datos);
          // console.log('Estado de la creación:', ok);
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
    });
///////////////////////////////////////////////////////////////
    export const PlagasStore = create()(
      devtools(
        persist(
          plagasApi,
          {name:'plagas' }
        )
      )
    );
/////////////////////////////////////////////////////////////////