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
