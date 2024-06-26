import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { FilterOptions } from "@/types";
import { CarsApi, CityApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useOrdersFilters() {
  const { data: models } = useQuery({
    queryKey: ["models"],
    queryFn: () =>
      fetcher<CarsApi>({
        endpoint: Urls.cars,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then(
        (res) =>
          ({
            name: "model",
            placeholder: "Модели",
            items: res.data.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          }) satisfies FilterOptions,
      ),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      fetcher<CityApi>({
        endpoint: Urls.cities,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then(
        (res) =>
          ({
            name: "city",
            placeholder: "Гороода",
            items: res.data.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          }) satisfies FilterOptions,
      ),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const { data: orderStatus } = useQuery({
    queryKey: ["orderStatus"],
    queryFn: () =>
      fetcher<CityApi>({
        endpoint: Urls.orderStatus,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then(
        (res) =>
          ({
            name: "status",
            placeholder: "Статус",
            items: res.data.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          }) satisfies FilterOptions,
      ),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  return models && cities && orderStatus ? [models, cities, orderStatus] : [];
}
