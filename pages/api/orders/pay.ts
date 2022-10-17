import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
   const paypalBearerToken = await getPaypalBearerToken();

   if (!paypalBearerToken) {
      return res.status(400).json({
         message: "No se pudo confirmar el token de paypal",
      });
   }

   return res.status(200).json({
      message: paypalBearerToken,
   });
};
