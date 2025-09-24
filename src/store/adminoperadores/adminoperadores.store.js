import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AdminOperadorService } from '../../services/adminoperadores/adminoperadores.service';

///////////////////////////////////////////////////////////////
    const adminoperadorApi = (set) => ({    
    operadores: undefined,      
      cargarTodosAdminOperadores: async () => {
        try {
          const {ok,datos}= await AdminOperadorService.cargarAdminProyectos();
                if(!ok){
                  set({operadores:undefined});
                  return false
                }
                  set({operadores:datos});
                  localStorage.setItem('operadores',datos);
                  return datos;

        } catch ( error ) {   
          throw undefined;
        }
      },
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
    });
///////////////////////////////////////////////////////////////
    export const AdminOperadorStore = create()(
      devtools(
        persist(
          adminoperadorApi,
          {name:'adminoperador' }
        )
      )
    );
/////////////////////////////////////////////////////////////////