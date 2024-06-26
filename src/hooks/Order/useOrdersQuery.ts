import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import qs from "qs";
import { useMemo, useState } from "react";

import { OrderApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";
import { transformOrders } from "@/utils/transformOrders";

export function useOrdersQuery({
  filters,
}: {
  filters: { city?: number; model?: number; status?: number };
}) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", page, limit, Object.values(filters)],
    queryFn: () =>
      fetcher<OrderApi>({
        endpoint: Urls.orders,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
        params: qs.stringify({
          page,
          limit,
          cityId: filters.city,
          carId: filters.model,
          orderStatusId: filters.status,
        }),
      }).then((res) => res),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const transformedOrders = useMemo(() => transformOrders(orders?.data), [orders?.data]);

  return {
    orders: transformedOrders,
    isLoading,
    setPage,
    page,
    setLimit,
    total: orders?.count,
    limit,
  };
}
