import { TIngredient, TOrder } from "./data";

export interface IResponse extends Response {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

export interface IOrderResponse extends IResponse {
  order: TOrder
}

export interface IOrdersResponse extends IResponse {
  order: Array<TOrder>
}

export type IHeaders = HeadersInit & {
  authorization?: string | null;
}

export interface IOptions extends RequestInit {
  headers: IHeaders;
}

export interface IIngredientResponse extends IResponse {
  data: Array<TIngredient>
}

export interface IRegisterResponse extends IResponse {
  user: {
    email: string,
    name: string
  },
}