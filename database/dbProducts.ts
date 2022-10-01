import { db } from "./";
import { Product } from "../models";
import { IProduct } from "../interfaces";

/*
En el contexto de getServerSideProps tenemos acceso a la BBDD, esa parte sería backend, por lo que es innecesario llamar al endpoint de la API.

Se puede hacer una petición HTTP al endpoint y funcionará, como tal la funcionalidad de la app ahí no cambia, pero teniendo acceso a la BBDD, es más rápido acceder directamente a la BBDD, que tener que hacer una petición HTTP a tu propio backend, que esta la reciba, la procese, llame a la BBDD, devuelva la respuesta y tú proceses de nuevo la respuesta.

A efectos prácticos, en muchos casos serán milisegundos que no se aprecian a simple vista, pero es más procesamiento que se puede llegar a notar, y más carga de trabajo al backend innecesaria.

*/

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

// Funcion para obtener todos los productos

interface ProductSlug {
   slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
   await db.connect();

   const slugs = await Product.find().select("slug -_id").lean();

   await db.disconnect();

   return slugs;
   /*
      slugs => 
      [
         {slug: "string"},
         {slug: "string"},
         {slug: "string"},
         {slug: "string"},
         {slug: "string"},
      ]
   */
};
