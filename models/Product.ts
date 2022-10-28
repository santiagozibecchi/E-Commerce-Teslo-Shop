import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "../interfaces";

const productSchema = new Schema(
   {
      description: {
         type: String,
         required: true,
         default: "",
      },
      images: [{ type: String }],
      inStock: {
         type: Number,
         required: true,
         default: 0,
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      sizes: [
         {
            type: String,
            enum: {
               // valores permitidos
               values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
               // En caso de que se mande un valor que no es permitido
               message: "{VALUE} no es un tamaño válido",
            },
         },
      ],
      slug: {
         type: String,
         required: true,
         // debe ser unico
         unique: true,
      },
      tags: [
         {
            type: String,
         },
      ],
      title: {
         type: String,
         required: true,
         default: "",
      },
      type: {
         type: String,
         enum: {
            values: ["shirts", "pants", "hoodies", "hats"],
            message: "{VALUE} no es un tipo válido",
         },
         default: "shirts",
      },
      gender: {
         type: String,
         enum: {
            values: ["men", "women", "kid", "unisex"],
            message: "{VALUE} no es un género válido",
         },
         default: "women",
      },
   },
   {
      timestamps: true,
   }
);

// * indice de Mongo para las busquedas
productSchema.index({ title: "text", tags: "text" });

const Product: Model<IProduct> =
   mongoose.models.Product || model("Product", productSchema);
// Primero busca si ya existe el modelo que estoy intentando establecer, y si ya existe usa ese

export default Product;
