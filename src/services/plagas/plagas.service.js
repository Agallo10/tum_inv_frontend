import { iotApi } from '../../api/iotApi'

export class PlagasService {
  // 🔄 Crear nuevo riego
  static crearPlagas = async (payload) => {
    console.log(payload);
    try {
      const resp = await iotApi.post('/plagas', payload)
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
  static cargarTodasPlagas = async (id) => {
    console.log(id)
    try {
      const resp = await iotApi.get(`/plagas/${id}`)
      const datos = resp.data
      console.log(datos);
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
