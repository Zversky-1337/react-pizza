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
  types: number[]; // индексы типов теста
  sizes: number[];
  toppings?: Topping[];
}

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string; // индекс теста
  size: number; // размер в см
  count: number; // количество этой позиции
}

export interface CartState {
  totalPrice: number;
  items: CartItemType[];
  countPizzaCart: number;
}

export interface ArrSortState {
  name: string;
  sortProperty: string;
}
