import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LaboresService } from '../../services/labores/labores.service';
///////////////////////////////////////////////////////////////
    const laboresApi = (set) => ({    
    labores: undefined,      
      cargarTodasLabores: async (uid) => {
        try {
          const {ok,datos}= await LaboresService.cargarTodasLabores(uid);
                if(!ok){
                  set({labores:undefined});
                  return false
                }
                  set({labores:datos});
                  localStorage.setItem('labores',datos);
                  return datos;

        } catch ( error ) {   
          throw undefined;
        }
      },
///////////////////////////////////////////////////////////////
      crearLabores: async (payload) => {
        try {
          // console.log('Payload de crearLabores:', payload);
          const {ok,datos}= await LaboresService.crearLabores(payload);
          // console.log('Datos de la labor creada:', datos);
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
    export const LaboresStore = create()(
      devtools(
        persist(
          laboresApi,
          {name:'labores' }
        )
      )
    );
/////////////////////////////////////////////////////////////////