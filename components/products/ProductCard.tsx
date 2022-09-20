import { FC } from "react";
import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';
import { IProduct } from "../../interfaces";

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   return (
      <Grid item xs={6} sm={4}>
         <Card>
            <CardActionArea>
               <CardMedia
                  component="img"
                  image={`products/${product.images[0]}`}
                  alt={product.title}
               />
            </CardActionArea>
         </Card>
         <Box sx={{ mt: 1 }} className="fadeIn">
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>${product.price}</Typography>
         </Box>
      </Grid>
   );
};
