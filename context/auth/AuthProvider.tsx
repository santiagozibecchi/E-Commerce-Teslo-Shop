import { FC, PropsWithChildren, useReducer, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";

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

   useEffect(() => {
      checkToken();
   }, []);

   const checkToken = async () => {
      // No necesito mandarle ninguna data mas, porque axios ya manda las cookies

      try {
         const { data } = await tesloApi.get("/user/validate-token");
         const { token, user } = data;
         Cookies.set("token", token);

         dispatch({ type: "[Auth] - Login", payload: user });
      } catch (error) {
         Cookies.remove("token");
      }
   };

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

   return (
      <AuthContext.Provider
         value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
