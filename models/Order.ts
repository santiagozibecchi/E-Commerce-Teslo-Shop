import moongose, { Schema, model, Model } from "mongoose";
import { IUser } from "../interfaces";

const orderSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Order: Model<IUser> =
   moongose.models.Order || model("Order", orderSchema);

export default Order;
