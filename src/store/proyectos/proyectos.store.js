import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ProyectosService } from '../../services/proyectos/proyectos.service';

///////////////////////////////////////////////////////////////
    const proyectosApi = (set) => ({    
    proyectos: undefined,
///////////////////////////////////////////////////////////////     
    starLoadtProyectos: async ( ) => {
        try {
          const {ok,datos}= await ProyectosService.starLoadallProyecto();
          // console.log(datos);
                if(!ok){
                  set({proyectos:undefined});
                  return false
                }
                  set({proyectos:datos});
                  localStorage.setItem('proyectos',datos);
                  return datos;

        } catch ( error ) {      
          throw 'Proyectos no cargados';
        }
      },
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
    });
///////////////////////////////////////////////////////////////
    export const ProyectoStore = create()(
      devtools(
        persist(
          proyectosApi,
          {name:'proyectos' }
        )
      )
    );
/////////////////////////////////////////////////////////////////