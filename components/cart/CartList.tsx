import { FC } from "react";
import { Typography } from "@mui/material";
import { initialData } from "../../database/products";
// Este componente debe recibir de algun o leerlo de lugar, los productos que voy a mostrar en el carrito de compras.

const productsInCart = [
   initialData.products[0],
   initialData.products[3],
   initialData.products[5],
];

export const CartList: FC = () => {
   return (
      <>
         {productsInCart.map((product) => (
            <Typography key={product.slug}>{product.title}</Typography>
         ))}
      </>
   );
};
