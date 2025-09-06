export interface Topping {
  id: number;
  name: string;
  price: number;
  UrlTopping: string;
}

export interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  toppings?: Topping[];
}

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface CartState {
  totalPrice: number;
  items: CartItemType[];
  countPizzaCart: number;
  status: string;
  error: string | null;
}

export interface ArrSortState {
  name: string;
  sortProperty: string;
}
