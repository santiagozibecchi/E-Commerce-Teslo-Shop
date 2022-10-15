import { isValidObjectId } from "mongoose";
import { IOrder } from "../interfaces/order";
import { db } from ".";
import { Order } from "../models";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
   await db.connect();

   if (!isValidObjectId(id)) {
      return null;
   }

   // Comprobar que el id de la orden existe
   const order = await Order.findById(id).lean();

   await db.disconnect();

   if (!order) {
      return null;
   }

   return JSON.parse(JSON.stringify(order));
};
