import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
   // Configure one or more authentication providers
   providers: [
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
            console.log({ credentials });
            // TODO Validar contra base de datos

            return { name: "juan", correo: "juan@gmail.com", role: "admin" };
         },
      }),
      GithubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,
      }),
   ],

   // Callbacks
   // Como quiero que se firme el jwt, que data es la qie voy a grabar en los token
   callbacks: {
      async jwt({ token, account, user }: any) {
         // console.log("------------------ JWT -----------------");
         // console.log({ token, account, user });
         if (account) {
            token.accessToken = account.access_token;

            switch (account.type) {
               case "credentials":
                  token.user = user;
                  break;

               case "oauth":
                  // TODO crear usuario o verificar si existe en DB
                  break;

               default:
                  break;
            }
         }
         return token;
      },
      // Cuando se genera una nueva session
      async session({ session, token, user }: any) {
         // console.log("------------- SESSION --------------------");
         // console.log({ session, token, user });
         session.accessToken = token.accessToken;
         session.user = token.user as any;

         return session;
      },
   },
};
export default NextAuth(authOptions);
