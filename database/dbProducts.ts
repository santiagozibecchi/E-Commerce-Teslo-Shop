import { db } from "./";
import { Product } from "../models";
import { IProduct } from "../interfaces";

export const getProductBySlug = async (
   slug: string
): Promise<IProduct | null> => {
   await db.connect();

   const product = await Product.findOne({ slug }).lean();

   await db.disconnect();

   if (!product) {
      return null;
   }

   // Forza al objeto a ser serializado como un string
   return JSON.parse(JSON.stringify(product));
};
