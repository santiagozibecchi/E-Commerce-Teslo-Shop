import { db } from ".";
import { User } from "../models";
import bcrypt from "bcryptjs";

export const checkEmailPassword = async (email: string, password: string) => {
   await db.connect();

   const user = await User.findOne({ email });

   await db.disconnect();

   if (!user) {
      // cuando envia un null a las credenciales significa que es incorrecta
      return null;
   }

   if (!bcrypt.compareSync(password, user.password!)) {
      return null;
   }

   const { role, name, _id } = user;

   return {
      _id,
      email: email.toLocaleLowerCase(),
      role,
      name,
   };
};

// Esta funcion crea o verifica una cuenta de Oauth
// quremos darle flexibilidad al usuario para que se autentique con el correo o tmb con las redes sociales.
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
   await db.connect();
   const user = await User.findOne({ email: oAuthEmail });

   // Si tenemos un usuario creado en la DB
   if (user) {
      await db.disconnect();
      const { _id, email, name, role } = user;
      return { _id, email, name, role };
   }

   const newUser = new User({
      email: oAuthEmail,
      name: oAuthName,
      password: "@",
      role: "client",
   });

   await newUser.save();
   await db.disconnect();

   const { _id, email, name, role } = newUser;
   return { _id, email, name, role };
};
