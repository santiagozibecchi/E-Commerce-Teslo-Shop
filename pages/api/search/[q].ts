import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
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
         return searchProducts(req, res);

      default:
         return res.status(400).json({
            message: "Bad Request",
         });
   }
}

const searchProducts = async (
   req: NextApiRequest,
   res: NextApiResponse<Data>
) => {
   // utilizo let porque voy a modificar el query una vez que lo obtenga
   let { q = "" } = req.query;

   q = q.toString().toLowerCase();

   if (q.length === 0) {
      return res.status(400).json({
         message: "Debe especificar el query de busqueda",
      });
   }

   try {
      await db.connect();
      const products = await Product.find({
         $text: { $search: q },
      })
         .select("title images price inStock slug -_id")
         .lean();
      await db.disconnect();

      return res.status(200).json(products);
   } catch (error) {
      console.log(error);
   }
};
