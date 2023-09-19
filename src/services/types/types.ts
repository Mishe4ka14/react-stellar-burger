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
  key?: string
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
  order: TOrder
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

export type TModal = {
  onClose(): void;
  children: JSX.Element
}

export type TIngredientComponent = {
  onClick(): void;
  ing: TIngredient
}

export type TConstructorItem = {
  ingredient: TIngredient
  index: number
  swap (dragIndex: number, hoverIndex: number): void;
};

export type TDragItem = {
  index: number
  id: string
  type: string
}