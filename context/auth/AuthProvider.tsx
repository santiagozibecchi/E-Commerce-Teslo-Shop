import { FC, PropsWithChildren, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext, authReducer } from "./";

import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";

// InitialState
export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
   const router = useRouter();
   const { data, status } = useSession();

   useEffect(() => {
      if (status === "authenticated") {
         console.log(data.user);
         // TODO dispatch({ type: "[Auth] - Login", payload: data.user as IUser });
      }
   }, [status, data]);

   // useEffect(() => {
   //    checkToken();
   // }, []);

   // Autenticacion personalizada
   // const checkToken = async () => {
   //    // No necesito mandarle ninguna data mas, porque axios ya manda las cookies

   //    // Si no encuentra el token, evitar peticion al backend
   //    if (!Cookies.get("token")) {
   //       return;
   //    }

   //    try {
   //       const { data } = await tesloApi.get("/user/validate-token");
   //       const { token, user } = data;
   //       Cookies.set("token", token);

   //       dispatch({ type: "[Auth] - Login", payload: user });
   //    } catch (error) {
   //       Cookies.remove("token");
   //    }
   // };

   const loginUser = async (
      email: string,
      password: string
   ): Promise<boolean> => {
      try {
         const { data } = await tesloApi.post("/user/login", {
            email,
            password,
         });

         const { token, user } = data;
         Cookies.set("token", token);
         dispatch({ type: "[Auth] - Login", payload: user });
         return true;
      } catch (error) {
         return false;
      }
   };

   const registerUser = async (
      name: string,
      email: string,
      password: string
   ): Promise<{ hasError: boolean; message?: string }> => {
      try {
         const { data } = await tesloApi.post("/user/register", {
            email,
            password,
            name,
         });

         const { token, user } = data;
         Cookies.set("token", token);
         dispatch({ type: "[Auth] - Login", payload: user });
         return {
            hasError: false,
         };
      } catch (error) {
         // Error en la peticion de axios al traer la data
         if (axios.isAxiosError(error)) {
            const { message } = error.response?.data as { message: string };
            return {
               hasError: true,
               message,
            };
         }
         //  Error inprevisto
         return {
            hasError: true,
            message: "No se pudo crear el usuario, intente de nuevo",
         };
      }
   };

   const logout = () => {
      Cookies.remove("token");
      Cookies.remove("cart");

      Cookies.remove("firstName");
      Cookies.remove("lastName");
      Cookies.remove("address");
      Cookies.remove("address2");
      Cookies.remove("zip");
      Cookies.remove("city");
      Cookies.remove("country");
      Cookies.remove("phone");
      // Hace un refresh de la aplicacion y al hacerlo se pierde todo el estado de la aplicacion
      router.reload();
   };

   return (
      <AuthContext.Provider
         value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
