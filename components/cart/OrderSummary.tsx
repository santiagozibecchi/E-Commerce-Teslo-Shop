import { Chip, Divider, Grid, Typography } from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

export const OrderSummary = () => {
   return (
      <Grid container>
         <Grid item xs={6}>
            <Typography>N° de productos</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Typography>3</Typography>
         </Grid>
         <Grid item xs={6}>
            <Typography>Subtotal</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Typography>${`${152.99}`}</Typography>
         </Grid>
         <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Typography>${`${39}`}</Typography>
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
            <Typography variant="subtitle1">${`${200}`}</Typography>
         </Grid>
      </Grid>
   );
};
