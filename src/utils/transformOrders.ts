import { Order } from "@/types";
import { OrderApi } from "@/types/api";

export function transformOrders(data?: OrderApi["data"]): Order[] {
  return (
    data?.map((order) => ({
      id: order.id,
      image: order.carId.thumbnail.path,
      orderInfo: {
        model: order.carId.name,
        city: order.cityId.name,
        point: order.pointId.address,
        dateTo: order.dateTo,
        dateFrom: order.dateFrom,
        color: order.color,
      },
      additional: {
        isFullTank: order.isFullTank,
        isNeedChildChair: order.isRightWheel,
        isRightWheel: order.isRightWheel,
      },
      price: order.price,
    })) ?? []
  );
}
