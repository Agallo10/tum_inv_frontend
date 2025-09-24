import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { OperadorService } from '../../services/operadores/operadores.service';

///////////////////////////////////////////////////////////////
    const operadorApi = (set) => ({    
    operadores: undefined,      
      cargarTodosOperadores: async () => {
        try {
          const {ok,datos}= await OperadorService.cargarOperadores();
         // console.log(datos);
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
    export const OperadorStore = create()(
      devtools(
        persist(
          operadorApi,
          {name:'operador' }
        )
      )
    );
/////////////////////////////////////////////////////////////////