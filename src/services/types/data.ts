export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TOrder = {
  success: boolean
  name: string;
  ingredients: Array<string>;
  status: string;
  number: number;
  createdAt: string;
  _id: string
  price: string
  order: any
}

export type TFeed = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
}

export type TUser = {
  email: string;
  name: string;
}

