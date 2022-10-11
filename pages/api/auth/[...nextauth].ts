import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

export const authOptions: NextAuthOptions = {
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
            // Validar contra base de datos y devuelve token
            return await dbUsers.checkEmailPassword(
               credentials!.email,
               credentials!.password
            );
         },
      }),

      GithubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,
      }),
   ],

   // Custom Pages
   pages: {
      signIn: "auth/login",
      newUser: "/auth/register",
   },

   session: {
      maxAge: 259200, // 30 dias
      strategy: "jwt",
      updateAge: 86400,
   },

   // Callbacks
   // Como quiero que se firme el jwt, que data es la que voy a grabar en los token
   callbacks: {
      async jwt({ token, account, user }: any) {
         // console.log("------------------ JWT -----------------");
         // console.log({ token, account, user });
         if (account) {
            token.accessToken = account.access_token;

            switch (account.type) {
               case "oauth":
                  token.user = await dbUsers.oAuthToDbUser(
                     user.email || "",
                     user.name || ""
                  );
                  break;

               case "credentials":
                  token.user = user;
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
