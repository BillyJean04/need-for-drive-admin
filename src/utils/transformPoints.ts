import { PointApi } from "@/types/api";

export function transformPoints(data: PointApi["data"]) {
  return data.map((point) => ({
    id: point.id,
    name: point.name,
    address: point.address,
    city: point.cityId.name,
  }));
}
