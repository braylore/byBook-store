import { IProducts } from './IProducts';

export interface IUserBasket extends IProducts {
  amount: number;
}

export interface IBasket {
  userId: string | null;
  totalAmount: number;
  totalPrice: number;
  userBasket: IUserBasket[];
}

export interface IBasketItemAddPayload {
  userId: string | null;
  userBasket: IUserBasket;
}

export interface IBasketItemChangePayload {
  userId: string | null;
  id: string;
}
