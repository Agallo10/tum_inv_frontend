import { iotApi } from '../../api/iotApi'

export class RiegoService {
  // 🔄 Crear nuevo riego
  static crearRiego = async (payload) => {
    console.log(payload);
    try {
      const resp = await iotApi.post('/riego', payload)
      const datos = resp.data
      return {
        ok: true,
        datos,
      }
    } catch (error) {
      const errorMessage = 'No se pudo crear el riego'
      return {
        ok: false,
        errorMessage,
      }
    }
  }

  // 📦 Obtener todos los riegos por proyecto
  static cargarTodosRiegos = async (id) => {
    try {
      const resp = await iotApi.get(`/riego/${id}`)
      const datos = resp.data
      return {
        ok: true,
        datos,
      }
    } catch (error) {
      const errorMessage = 'No se pudieron cargar los riegos'
      return {
        ok: false,
        errorMessage,
      }
    }
  }
}
