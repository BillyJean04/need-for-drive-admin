import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { FilterOptions } from "@/types";
import { CityApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useCitiesQuery() {
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
            name: "cityId",
            placeholder: "Гороода",
            items: res.data.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          }) satisfies FilterOptions,
      ),
    refetchOnWindowFocus: false,
  });

  return cities;
}
