import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";

type Data =
   | {
        message: string;
     }
   | {
        token: string;
        user: { email: string; role: string; name: string };
     };

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   switch (req.method) {
      case "POST":
         return registerUser(req, res);

      default:
         res.status(400).json({
            message: "Bad Request",
         });
   }
}

const registerUser = async (
   req: NextApiRequest,
   res: NextApiResponse<Data>
) => {
   const {
      email = "",
      password = "",
      name = "",
   } = req.body as { email: string; password: string; name: string };

   if (password.length < 6) {
      return res.status(400).json({
         message: "La contraseña debe contener 6 caracteres o más",
      });
   }

   if (name.length < 6) {
      return res.status(400).json({
         message: "El nombre debe de ser de 2 o más caracteres",
      });
   }

   await db.connect();
   const user = await User.findOne({ email });

   if (user) {
      await db.disconnect();
      return res.status(400).json({
         message: "Ya existe un usuario con el mismo email",
      });
   }

   if (!validations.isValidEmail(email)) {
      return res.status(400).json({
         message: "El correo que ingreso no es valido",
      });
   }

   const newUser = new User({
      email: email.toLocaleLowerCase(),
      password: bcrypt.hashSync(password),
      rol: "client",
      name,
   });

   try {
      await newUser.save({ validateBeforeSave: true });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: "Revisar logs del servidor",
      });
   }

   const { _id, role } = newUser;

   const token = jwt.signToken(_id, email);

   return res.status(200).json({
      token,
      user: {
         email,
         role,
         name,
      },
   });
};
