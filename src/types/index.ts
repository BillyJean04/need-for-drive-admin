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
