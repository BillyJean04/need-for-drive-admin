export interface LoginApi {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: number;
}

export interface City {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Car {
  id: number;
  priceMax?: number;
  priceMin?: number;
  name: string;
  thumbnail: {
    path: string;
    size: number;
  };
  description: string;
  number: string;
  tank: string;
  colors: string[];
  createdAt: Date;
  updatedAt: Date;
  categoryId: Category;
}

export interface Rate {
  id: number;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  rateTypeId: {
    id: number;
    name: string;
    unit: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Point {
  id: number;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  cityId: City;
}

export interface OrderApi {
  data: {
    id: number;
    color: string;
    dateFrom: string;
    dateTo: string;
    price: number;
    isFullTank: boolean;
    isNeedChildChair: boolean;
    isRightWheel: boolean;
    createdAt: Date;
    updatedAt: Date;
    cityId: City;
    pointId: Point;
    carId: Car;
    rateId: Rate;
  }[];
  count: number;
}
