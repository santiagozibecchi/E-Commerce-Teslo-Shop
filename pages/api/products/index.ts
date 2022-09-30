import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data =
   | {
        message: string;
     }
   | IProduct[];

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   switch (req.method) {
      case "GET":
         return getProducts(req, res);

      default:
         return res.status(400).json({
            message: "Bad Request",
         });
   }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   // siempre voy a tener un genero
   const { gender = "all" } = req.query;
   // req.query => es el queryString que viaja por la URL despues de products que es la entrada principal para acceder y obtener los productos, se podria decir que es el parametro

   let condition = {};

   if (
      gender !== "all" &&
      // Tengo que validar los valores que puede recibir el objeto condition, ya que es necesario evitar que se realicen peticiones innecesarias
      SHOP_CONSTANTS.validGenders.includes(`${gender}`)
      // si el valor gender no se encuentra dentro de los valores permitidos devolvera falso.
   ) {
      condition = { gender };
   }

   await db.connect();

   // Peticiones a la base de datos
   const products = await Product.find(condition)
      .select("title images price inStock slug -_id")
      .lean();

   await db.disconnect();

   return res.status(200).json(products);
};
