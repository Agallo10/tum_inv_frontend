import { create } from "zustand";
import { AuthService } from "../../services/auth/auth.service";
import { devtools, persist } from "zustand/middleware";

///////////////////////////////////////////////////////////////
const storeApi = (set) => ({
  status: "unauthorized",
  token: undefined,
  rol: undefined,
  user: undefined,

  loginUser: async ({ username, password }) => {
    try {
      const { usuario, token } = await AuthService.login({
        username,
        password,
      });
      if (!usuario) {
        set({ status: "unauthorized", token: undefined, user: undefined });
        return false;
      }
      set({ status: "authenticated", token: token, user: usuario });
      localStorage.setItem("token", token);
      return true;
    } catch (error) {
      throw "unauthorized";
    }
  },
  ///////////////////////////////////////////////////////////////
  logout: async () => {
    localStorage.clear();
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
  ///////////////////////////////////////////////////////////////
  // checkStatus: async()=>{
  //   const resp = await authCheckStatus();
  //   if(!resp){
  //     set({status:'unauthorized',token:undefined,user:undefined});
  //     return
  //   }
  //   localStorage.setItem('token',resp.token);
  //     set({status:'authenticated',token:resp.token,user:resp.usuario});
  // },
  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const AuthStore = create()(
  devtools(persist(storeApi, { name: "autenticacion" }))
);
/////////////////////////////////////////////////////////////////
