import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";
import { isValidObjectId } from "mongoose";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data =
   | {
        message: string;
     }
   | IProduct[]
   | IProduct;

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   switch (req.method) {
      case "GET":
         return getProducts(req, res);
      case "PUT":
         return updateProduct(req, res);
      case "POST":
         return createProduct(req, res);

      default:
         res.status(400).json({ message: "Bad Request" });
   }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   await db.connect();

   const products = await Product.find().sort({ title: "asc" }).lean();

   await db.disconnect();
   // TODO
   // Tendremos que actualizar las imagenes => cloudynary

   return res.status(200).json(products);
};

const createProduct = async (
   req: NextApiRequest,
   res: NextApiResponse<Data>
) => {
   const { _id = "", images = [] } = req.body as IProduct;

   if (images.length < 2) {
      return res.status(400).json({
         message: "El producto necesita al menos 2 imágenes",
      });
   }

   try {
      await db.connect();

      const productInDB = await Product.findOne({ slug: req.body.slug });

      if (productInDB) {
         return res.status(400).json({
            message: "Ya existe un producto con ese slug",
         });
      }

      const product = new Product(req.body);
      await product.save();
      await db.disconnect();

      return res.status(201).json(product);
   } catch (error) {
      await db.disconnect();
      console.log(error);
      return res.status(400).json({
         message: "Revisar la consola del servidor",
      });
   }
};

const updateProduct = async (
   req: NextApiRequest,
   res: NextApiResponse<Data>
) => {
   // tengo que asegurarme de que siempre vengan al menos 2 imagenes

   const { _id = "", images = [] } = req.body as IProduct;

   if (!isValidObjectId(_id)) {
      return res.status(400).json({
         message: "El id del producto no es válido",
      });
   }

   if (images.length < 2) {
      return res.status(400).json({
         message: "Es necesario al menos 2 imágenes",
      });
   }

   // TODO: tendremos localhost:3000/products/imasd43afa.jpg
   // * Los paths relativos no sirven a la hora de hacer socialShearing

   try {
      await db.connect();

      const product = await Product.findById(_id);

      if (!product) {
         await db.disconnect();
         return res.status(400).json({
            message: "No existe un producto con ese id",
         });
      }

      // TODO: eliminar fotos en Cloudinary
      // https://res.cloudinary.com/dkp5l1jti/image/upload/v1666983576/yfalen9zxjas4fwnysf7.jpg

      // Para esto voy a necesitar saber cuales eran las imagenes que teniamos antes, que ahora ya no tenemos, para eliminarla/s
      product.images.forEach(async (image) => {
         if (!images.includes(image)) {
            // Borrar de cloudinary

            // Busca la posicion indice del ultimo slash y cortarlo a partir de allí + 1 para eliminar tmb el slash
            // split: retorna un arreglo de string separado por "."
            const [fileId, extension] = image
               .substring(image.lastIndexOf("/") + 1)
               .split(".");
            await cloudinary.uploader.destroy(fileId);
         }
      });

      await product.update(req.body);
      await db.disconnect();

      return res.status(200).json(product);
   } catch (error) {
      console.log(error);
      await db.disconnect();
      return res.status(400).json({
         message: "Revisar la consola del servidor",
      });
   }
};
