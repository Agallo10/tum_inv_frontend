import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ClientesService } from '../../services/clientes/clientes.service';


///////////////////////////////////////////////////////////////
    const clientesApi = (set) => ({    
    clientes: undefined,
    
     
    cargarClientes: async ( ) => {
        try {
          const {ok,datos}= await ClientesService.cargarClientes();
          console.log(datos);
                if(!ok){
                  set({dispositivos:undefined});
                  return false
                }
                  set({proyedispositivosctos:datos.Clientes});
                  //localStorage.setItem('dispositivos',datos);
                  return datos.Clientes;

        } catch ( error ) {      
          throw 'Clientes no cargados';
        }
      },
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
    });
///////////////////////////////////////////////////////////////
    export const ClienteStore = create()(
      devtools(
        persist(
          clientesApi,
          {name:'cliente' }
        )
      )
    );
/////////////////////////////////////////////////////////////////