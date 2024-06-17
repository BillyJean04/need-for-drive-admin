import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import qs from "qs";
import { useState } from "react";

import { Point } from "@/types";
import { PointApi } from "@/types/api";
import { calculatePageData, getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";
import { transformPoints } from "@/utils/transformPoints";

export function usePointsQuery({ filters }: { filters: { cityId?: number } }) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const { data: points, isLoading } = useQuery({
    queryKey: ["points", page, limit, Object.values(filters)],
    queryFn: () =>
      fetcher<PointApi>({
        endpoint: Urls.points,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
        params: qs.stringify({
          page,
          limit,
          cityId: filters.cityId,
        }),
      }).then((res) => ({
        data: transformPoints(res.data),
        count: res.count,
      })),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const pointsPerPage = calculatePageData<Point>({
    data: points?.data ?? [],
    page,
    pageLimit: limit,
  });

  return {
    points: pointsPerPage,
    count: points?.count,
    isLoading,
    page,
    limit,
    setPage,
    setLimit,
  };
}
