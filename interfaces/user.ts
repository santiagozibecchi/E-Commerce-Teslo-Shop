export interface IUser {
   _id: string;
   name: string;
   email: string;
   password?: string;
   role: string;

   createdAt?: string;
   updatedAt?: string;
}

// password: no lo voy a tener en el front-end, el password solo me va a servir para identificarlo cuando estoy en fase de transferencia o cuando estoy en el backend 
