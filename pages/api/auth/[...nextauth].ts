import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
   // Configure one or more authentication providers
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,
      }),
      // ...add more providers here
      Credentials({
         name: "Custom Login",
         credentials: {
            email: { label: "Correo", type: "email", placeholder: "Correo" },
            password: {
               label: "Contraseña",
               type: "password",
               placeholder: "Contraseña",
            },
         },
         // regresa null en caso de que la autenticacion falle o un objeto si todo pasa. Este tiene que tener la informacion que nosotros queremos que sea recibida para crear los token de autenticacion.
         async authorize(credentials) {
            console.log(credentials);
            // TODO Validar contra base de datos

            return null;
         },
      }),
   ],

   // Callbacks
   callbacks: {},
};
export default NextAuth(authOptions);
