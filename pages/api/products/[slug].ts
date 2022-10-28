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
      const product = await Product.findOne({ slug }).lean();
      await db.disconnect();

      if (!product) {
         await db.disconnect();
         res.status(404).json({
            message: "No se encontro el producto",
         });
      }

      product!.images! = product!.images.map((image) => {
         return image.includes("http")
            ? image
            : `${process.env.HOST_NAME}products/${image}`;
      });

      return res.status(200).json(product);
   } catch (error) {
      console.log(error);
   }
};
