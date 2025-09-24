import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AccesoRemotoService } from "../../services/accesoremoto/accesoremoto.service";

///////////////////////////////////////////////////////////////
const accesoRemotoApi = (set) => ({
  allAccesos: undefined,
  allAccesosByEq: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadAllAccesosRemotos: async () => {
    try {
      const { ok, datos } = await AccesoRemotoService.getAllAccesosRemotos();
      // console.log(datos);
      if (!ok) {
        set({ allAccesos: undefined });
        return false;
      }
      set({ allAccesos: datos });
      localStorage.setItem("accesos-remotos", datos);
      return datos;
    } catch (error) {
      throw "accesos remotos no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadAllAccesosRemotosByEquipos: async (id) => {
    try {
      const { ok, datos } =
        await AccesoRemotoService.getAllAccesosRemotosByEquipos(id);
      // console.log(datos);
      if (!ok) {
        set({ allAccesosByEq: undefined });
        return false;
      }
      set({ allAccesosByEq: datos });
      localStorage.setItem("accesos-remotos-equipo", datos);
      return datos;
    } catch (error) {
      throw "accesos remotos mpor equipo no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearAccesoRemoto: async (payload) => {
    try {
      console.log("Payload de createAccesoRemoto:", payload);
      const { ok, datos } =
        await AccesoRemotoService.createAccesoRemoto(payload);
      // console.log('Datos de la labor creada:', datos);
      console.log("Estado de la creación:", ok);
      if (!ok) {
        return ok;
      }
      return ok;
    } catch (error) {
      throw undefined;
    }
  },

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const AccesoRemotoStore = create()(
  devtools(persist(accesoRemotoApi, { name: "accesoRemoto" }))
);
/////////////////////////////////////////////////////////////////
