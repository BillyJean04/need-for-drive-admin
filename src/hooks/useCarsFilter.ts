import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useMemo } from "react";

import { Car } from "@/types";
import { CarApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useCarsFilter({ cars, filters }: { cars: Car[]; filters: { category?: number } }) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetcher<CarApi>({
        endpoint: Urls.categories,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then((res) => ({
        name: "category",
        placeholder: "Категория",
        items: res.data.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      })),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const filteredCars = useMemo(
    () => cars?.filter((car) => car.category.id === filters.category),
    [cars, filters],
  );

  return {
    categories: categories ? [categories] : [],
    filteredCars: !isEmpty(filters) ? filteredCars : cars,
  };
}
