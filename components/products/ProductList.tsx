import { FC } from "react";
import { Grid } from "@mui/material";
import { IProduct } from "../../interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
   products: IProduct[];
}
// Recibo el arreglo de productos porque este componente me muestra la lista de productos

export const ProductList: FC<Props> = ({ products }) => {
   return (
      <Grid container spacing={4}>
         {products.map((product) => (
            <ProductCard product={product} key={product.slug} />
         ))}
      </Grid>
   );
};
