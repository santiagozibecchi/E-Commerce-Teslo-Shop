import { IUser, ISize } from "./";
// El user es flexible porque puede que mi endpoint regrese todo el usuario o ciertas partes del usuario o _id
export interface IOrder {
   _id?: string;
   user?:
      | IUser
      | string /* si hago el populate obtengo los datos del usuario de tipo string */;
   orderItems: IOrderItem[];
   shippingAddress: ShippingAddress;
   paymentResult?: string;

   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;

   isPaid: boolean;
   paidAt?: string;

   transactionId?: string;

   createdAt: string;
}

export interface IOrderItem {
   _id: string;
   title: string;
   size: ISize;
   quantity: number;
   slug: string;
   images: string;
   price: number;
   gender: string;
}

export interface ShippingAddress {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zip: string;
   city: string;
   country: string;
   phone: string;
}
