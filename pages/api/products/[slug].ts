import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces/products";

type Data =
   | {
        message: string;
     }
   | IProduct
   | null;

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   switch (req.method) {
      case "GET":
         return getProductBySlug(req, res);

      default:
         return res.status(400).json({
            message: "Bad Request xd",
         });
   }
}

const getProductBySlug = async (
   req: NextApiRequest,
   res: NextApiResponse<Data>
) => {
   const { slug } = req.query;

   await db.connect();

   try {
      const productFoundBySlug = await Product.findOne({ slug }).lean();
      await db.disconnect();

      if (!productFoundBySlug) {
         await db.disconnect();
         res.status(404).json({
            message: "No se encontro el producto",
         });
      }

      return res.status(200).json(productFoundBySlug);
   } catch (error) {
      console.log(error);
   }
};
