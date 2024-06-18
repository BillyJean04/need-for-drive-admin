export interface Order {
  id: number;
  image: string;
  orderInfo: {
    model: string;
    city: string;
    point: string;
    dateTo: string;
    dateFrom: string;
    color: string;
  };
  additional: {
    isFullTank: boolean;
    isNeedChildChair: boolean;
    isRightWheel: boolean;
  };
  price: number;
}

export interface Car {
  id: number;
  priceMax: number;
  priceMin: number;
  name: string;
  image: string;
  description: string;
  number: string;
  tank: string;
  colors: string[];
  category: {
    id: number;
    name: string;
  };
}

export interface Point {
  id: number;
  name: string;
  address: string;
  city: string;
}

export interface FilterItems {
  [key: string]: number;
}

export interface FilterOptions {
  name: string;
  placeholder: string;
  items: {
    value: number;
    label: string;
  }[];
}

export interface PointField {
  id: number;
  name: string;
  address: string;
  city: number;
}

export interface CarField {
  image: string;
  model: string;
  category: string;
  color: string;
  colors: string[];
  priceMin: number;
  priceMax: number;
  tank: string;
  number: string;
  description: string;
}

export interface CarMutation {
  id?: string;
  name: string;
  priceMax: number;
  priceMin: number;
  thumbnail: {
    path: string;
  };
  description: string;
  categoryId: {
    id: number;
  };
  colors: string[];
  number: string;
  tank: number;
}
