import { Chip, Divider, Grid, Typography } from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { useContext } from "react";
import { CartContext } from "../../context";

export const OrderSummary = () => {
   const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

   return (
      <Grid container>
         <Grid item xs={6}>
            <Typography>N° de productos</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Typography>{numberOfItems}</Typography>
         </Grid>
         <Grid item xs={6}>
            <Typography>Subtotal</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Typography>{subTotal}</Typography>
         </Grid>
         <Grid item xs={6}>
            <Typography>
               Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
            </Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Typography>{tax}</Typography>
         </Grid>
         <Grid item xs={12} mt={2}>
            <Divider sx={{ my: 1 }} variant="middle">
               <Chip
                  icon={<PaymentsOutlinedIcon />}
                  variant="outlined"
                  color="secondary"
                  label="TOTAL"
                  sx={{
                     fontWeight: "bold",
                     flexDirection: "row-reverse",
                     justifyContent: "center",
                     alignItems: "center",
                     paddingLeft: "10px",
                     paddingRight: "27px",
                  }}
               />
            </Divider>
         </Grid>
         {/* <Grid item xs={6}>
            <Typography variant="subtitle1">Total:</Typography>
         </Grid> */}
         <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="subtitle1">{total}</Typography>
         </Grid>
      </Grid>
   );
};
