import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// conf de la variable de entorno
cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {
   message: string;
};

// Le dice a Next que no parsee el body, que lo deje como viene
// Para evitar realizar muchos procesos ocupamos un paquete de tercero
export const config = {
   api: {
      bodyParser: false,
   },
};

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   switch (req.method) {
      case "POST":
         return uploadFile(req, res);

      default:
         return res.status(400).json({ message: "Bad Request" });
   }
}

const saveFile = async (file: formidable.File): Promise<string> => {
   const { secure_url } = await cloudinary.uploader.upload(file.filepath);
   return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
   return new Promise((resolve, reject) => {
      // Objeto de formidable para analizar el objeto que estoy mandando
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
         //  console.log({ err, fields, files });

         if (err) {
            return reject(err);
         }

         // tenemos un archivo y vamos a poder grabarlo
         const filePath = await saveFile(files.file as formidable.File);
         resolve(filePath);
      });
   });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
   const imageUrl = await parseFiles(req);

   return res.status(200).json(imageUrl);
};

/*
const saveFile = async (file: formidable.File) => {
    // Almacenamos en fileSystem
    //const data = fs.readFileSync(file.filepath);
    // Escritura y movimiento de ese archivo a una carpeta fisica
    //fs.writeFileSync(`./public/${file.originalFilename}`, data);
    //Borramos el archivo que se encuentra en el fileSystem temporal para evitar que se llene de basura, este puede tener su limite
    //fs.unlinkSync(file.filepath);
    //return;
    };
    
    */
