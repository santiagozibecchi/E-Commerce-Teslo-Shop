import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { IOrder } from "../../../interfaces";
import { Product, Order } from "../../../models";

type Data =
   | {
        message: string;
     }
   | IOrder;

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   switch (req.method) {
      case "POST":
         return createOrder(req, res);

      default:
         res.status(400).json({ message: "Bad Request" });
   }
}
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   // Significa que solamente luce como IOrder, no que debe ser tratado como tal.
   const { orderItems, total } = req.body as IOrder;

   // Verificar que tengamos un usuario
   const session: any = await getSession({ req });

   if (!session) {
      return res.status(401).json({
         message: "Debe estar autenticado para seguir con la compra",
      });
   }

   // Creo un arreglo con los _id´s para saber los productos que la persona quiere
   const productsIds = orderItems.map((product) => product._id);
   await db.connect();

   const dbProducts = await Product.find({ _id: { $in: productsIds } });

   try {
      const subTotal = orderItems.reduce((prev, current) => {
         // Verificando que tanto el id de la db como el que viene del front coincidan para acceder al precio del producto del id
         // ! Tener en cuenta que estamos trabajando en el ObjectId de mongo => p.id para acceder al id string
         const currentPrice = dbProducts.find(
            (p) => p.id === current._id
         )!.price;
         if (!currentPrice) {
            throw new Error(
               "Verifique el carrito de nuevo, el producto no existe"
            );
         }

         return currentPrice * current.quantity + prev;
      }, 0);

      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

      const backendTotal = subTotal * (taxRate + 1);

      if (total !== backendTotal) {
         throw new Error("El total no cuadra con el monto");
      }

      // * En este punto ya sería una orden permitida:

      const userId = session.user._id;
      const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

      await newOrder.save();

      return res.status(201).json(newOrder);
   } catch (error) {
      await db.disconnect();
      console.log(error);
      res.status(400).json({
         message: "Revise logs del servidor",
      });
   }

   //    res.status(201).json(req.body);
};
