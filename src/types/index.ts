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
