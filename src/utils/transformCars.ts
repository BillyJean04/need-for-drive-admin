import { Car } from "@/types";
import { CarApi } from "@/types/api";

export function transformCars(data: CarApi["data"]) {
  return data.map(
    (car) =>
      ({
        id: car.id,
        priceMin: car.priceMin ?? 0,
        priceMax: car.priceMax ?? 0,
        name: car.name,
        image: car.thumbnail.path,
        description: car.description,
        number: car.number,
        tank: car.tank,
        colors: car.colors,
        category: {
          id: car.categoryId.id,
          name: car.categoryId.name,
        },
      }) satisfies Car,
  );
}
