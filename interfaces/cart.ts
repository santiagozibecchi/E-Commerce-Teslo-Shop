import { ISize } from "./";

export interface ICartProduct {
   _id: string;
   // mostraremos una sola imagen del producto
   images: string;
   price: number;
   // Solo es necesario un precio (no va a cambiar el precio por talla)
   sizes: ISize;
   // Para poder regresar al articulo
   slug: string;
   title: string;
   gender: "men" | "women" | "kid" | "unisex";
   // Numero de elemento que se esta llevando
   quantity: number;
}
