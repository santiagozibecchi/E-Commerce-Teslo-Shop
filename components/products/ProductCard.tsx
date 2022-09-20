import { FC } from "react";
import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
import { IProduct } from "../../interfaces";

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   return (
      <Grid item xs={6} sm={4} key={product.slug}>
         <Card>
            <CardActionArea>
               <CardMedia
                  component="img"
                  image={`products/${product.images[0]}`}
                  alt={product.title}
               />
            </CardActionArea>
         </Card>
      </Grid>
   );
};
