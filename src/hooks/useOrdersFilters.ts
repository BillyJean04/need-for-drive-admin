import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { CarApi, CityApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useOrdersFilters() {
  const { data: models } = useQuery({
    queryKey: ["models"],
    queryFn: () =>
      fetcher<CarApi>({
        endpoint: Urls.cars,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then((res) =>
        res.data.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      ),
    refetchOnWindowFocus: false,
  });

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      fetcher<CityApi>({
        endpoint: Urls.cities,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then((res) =>
        res.data.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      ),
    refetchOnWindowFocus: false,
  });
  const { data: orderStatus } = useQuery({
    queryKey: ["orderStatus"],
    queryFn: () =>
      fetcher<CityApi>({
        endpoint: Urls.orderStatus,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then((res) =>
        res.data.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      ),
    refetchOnWindowFocus: false,
  });

  return { models, cities, status: orderStatus };
}
