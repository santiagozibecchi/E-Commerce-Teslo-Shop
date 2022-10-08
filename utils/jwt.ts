import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
   if (!process.env.JWT_SECRET_SEED) {
      throw new Error("No hay semilla de JWT - Revisar variables de entorno");
   }

   return jwt.sign(
      {
         // payload - lo que voy a grabar
         _id,
         email,
      },
      // Seed
      process.env.JWT_SECRET_SEED,
      {
         //   Options
         expiresIn: "30d",
      }
   );
};
