import { useQuery } from "@tanstack/react-query";
import { Card, Empty, Typography } from "antd";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useState } from "react";

import { FilterControls } from "@/components";
import { useCarsFilter } from "@/hooks";
import { StyledEmptyData } from "@/pages/Orders/Orders.styled";
import { StyledPagination } from "@/styles/global.styled";
import { Car } from "@/types";
import { CarApi } from "@/types/api";
import { calculatePageData, createRenderArray, getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";
import { itemRender } from "@/utils/paginationItemRender";
import { transformCars } from "@/utils/transformCars";

import { StyledCarsCardContainer, StyledCarsContainer } from "./Cars.styled";
import { CarItem, CarItemSkeleton } from "./components";

export function Cars() {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [filters, setFilters] = useState<{ category?: number }>({});

  const { data: cars, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: () =>
      fetcher<CarApi>({
        endpoint: Urls.cars,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then((res) => transformCars(res.data)),
    refetchOnWindowFocus: false,
  });

  const { categories, filteredCars } = useCarsFilter({
    cars: cars ?? [],
    filters,
  });

  const carsPerPage = calculatePageData<Car>({ data: filteredCars ?? [], page, pageLimit });

  return (
    <StyledCarsContainer>
      <Typography.Title level={2}>Автомобили</Typography.Title>
      <Card>
        <FilterControls
          setPage={setPage}
          setFilters={setFilters}
          options={categories ? [categories] : []}
          isClient
        />
        <StyledCarsCardContainer>
          {isLoading && createRenderArray(pageLimit).map((item) => <CarItemSkeleton key={item} />)}
          {carsPerPage?.map((car) => <CarItem key={car.id} car={car} />)}
        </StyledCarsCardContainer>
        {!isLoading && isEmpty(filteredCars) && (
          <StyledEmptyData>
            <Empty description="Нет данных" />
          </StyledEmptyData>
        )}
        <StyledPagination
          showLessItems
          itemRender={itemRender}
          defaultPageSize={5}
          responsive
          hideOnSinglePage
          current={page}
          total={filteredCars.length}
          onChange={(currentPage, pageSize) => {
            setPage(currentPage);
            setPageLimit(pageSize);
          }}
          showSizeChanger={false}
        />
      </Card>
    </StyledCarsContainer>
  );
}
