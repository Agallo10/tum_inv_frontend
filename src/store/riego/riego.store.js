import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { RiegoService } from '../../services/riego/riego.service'

const riegoApi = (set) => ({
  riegos: undefined,

  startLoadRiegos: async (uid) => {
    try {
      const { ok, datos } = await RiegoService.cargarTodosRiegos(uid)
      if (!ok) {
        set({ riegos: undefined })
        return false
      }
      set({ riegos: datos })
      localStorage.setItem('riegos', JSON.stringify(datos))
      return datos
    } catch (error) {
      throw 'Riegos no cargados'
    }
  },

  crearRiego: async (payload) => {
    try {
      console.log('Payload de crearRiego:', payload)
      const { ok, datos } = await RiegoService.crearRiego(payload)
      console.log('Estado de la creación:', ok)
      if (!ok) {
        return ok
      }
      return ok
    } catch (error) {
      throw undefined
    }
  },
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////  
})

export const RiegoStore = create()(
  devtools(
    persist(
      riegoApi, 
      {name: 'riego'}
    )
  )
)
