import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDatabase } from "../../database";
import { Product } from "../../models";

type Data = {
   message: string;
};

// * ENDPOINT SEMILLA: CARGAR DATOS EN DB

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   // EVITA EL ENTORNO DE PRODUCCION PARA SOLO TRABAJAR EN EL DE DESARROLLO
   if (process.env.NODE_ENV === "production") {
      return res
         .status(401)
         .json({ message: "No tiene acceso a este servicio" });
   }

   await db.connect();

   // Elimina la coleccion existente
   await Product.deleteMany();
   // Insertar informacion en la base de datos
   await Product.insertMany(seedDatabase.initialData.products);
   await db.disconnect();

   res.status(200).json({ message: "Proceso realizado correctamente" });
}

// CADA VEZ QUE QUERAMOS PURGAR LA BASE DE DATOS LLAMAR AL ENDPOINT
// * "http://localhost:3000/api/seed"
