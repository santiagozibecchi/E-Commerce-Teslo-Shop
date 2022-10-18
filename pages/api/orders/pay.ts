import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { IPaypal } from "../../../interfaces";
import { db } from "../../../database";
import { Order } from "../../../models";

type Data = {
   message: string | null;
};

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   switch (req.method) {
      case "POST":
         return payOrder(req, res);

      default:
         return res.status(400).json({ message: "Bad Request" });
   }
}

// Si regresa null es porque ocurrio un error y no vamos a continuar
const getPaypalBearerToken = async (): Promise<string | null> => {
   const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
   const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

   const body = new URLSearchParams("grant_type=client_credentials");

   // "Llave de acceso" => lo que se manda como username y password desde postman
   const base64Token = Buffer.from(
      `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
      "utf-8"
   ).toString("base64");

   //    console.log(PAYPAL_CLIENT);
   //    console.log(PAYPAL_SECRET);

   try {
      const { data } = await axios.post(
         process.env.PAYPAL_OAUTH_URL || "",
         body,
         {
            headers: {
               Authorization: `Basic ${base64Token}`,
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );

      return data.access_token;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.log(error.response?.data);
      } else {
         console.log(error);
      }
      return null;
   }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   // TODO: validar la sesion del usuario
   // TODO: validar mongoID

   // * Token de validacion desde nuestro backend
   const paypalBearerToken = await getPaypalBearerToken();

   if (!paypalBearerToken) {
      return res.status(400).json({
         message: "No se pudo confirmar el token de paypal",
      });
   }

   const { transactionId = "", orderId = "" } = req.body;

   // Si todo sale bien tenemos que hacer la peticion al href, mandando el token generado
   // Usualmente los token van en los headers

   const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      {
         headers: {
            Authorization: `Bearer ${paypalBearerToken}`,
         },
      }
   );

   if (data.status !== "COMPLETED") {
      return res.status(401).json({
         message: "Orden no reconocida",
      });
   }

   await db.connect();

   const dbOrder = await Order.findById(orderId);

   if (!dbOrder) {
      await db.disconnect();
      return res.status(400).json({
         message: "La Orden no existe en la base de datos",
      });
   }

   if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
      await db.disconnect();
      return res.status(400).json({
         message: "Los montos de Paypal y nuestra orden no son iguales",
      });
   }

   dbOrder.transactionId = transactionId;
   dbOrder.isPaid = true;
   await dbOrder.save();

   await db.disconnect();

   return res.status(200).json({
      message: "Orden Pagada correctamente",
   });
};
