import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Card, GetProp, Table, TablePaginationConfig, TableProps, Typography } from "antd";
import Cookies from "js-cookie";
import qs from "qs";
import { useMemo, useState } from "react";

import { OrderApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";
import { itemRender } from "@/utils/paginationItemRender";

import { getOrdersColumns } from "./columns";
import { FilterControls } from "./components/FilterControls";
import { StyledOrdersContainer } from "./Orders.styled";
import { transformOrders } from "./transformOrders";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

export function Orders() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isFilterSelected, setIsFilterSelected] = useState<boolean>(false);

  const [filters, setFilters] = useState({
    model: "",
    city: "",
    color: "",
  });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: page,
      pageSize: limit,
    },
  });

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () =>
      fetcher<OrderApi>({
        endpoint: Urls.orders,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
        params: qs.stringify({ page, limit }),
      }).then((res) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.count,
          },
        });
        return res;
      }),
    placeholderData: keepPreviousData,
  });

  const handleTableChange: TableProps["onChange"] = (pagination, sorter) => {
    setTableParams({
      pagination,
      ...sorter,
    });

    if (pagination.current) {
      setPage(pagination.current);
    }
  };

  const transformedOrders = useMemo(() => {
    if (isFilterSelected) {
      const filtered = orders?.data?.filter(
        (order) =>
          order.carId.name.toLowerCase().includes(filters.model.toLowerCase()) &&
          order.cityId.name.toLowerCase().includes(filters.city.toLowerCase()) &&
          order.color.toLowerCase().includes(filters.color.toLowerCase()),
      );

      return transformOrders(filtered);
    }
    return transformOrders(orders?.data);
  }, [filters.city, filters.color, filters.model, isFilterSelected, orders?.data]);

  const handleClickSubmitFilter = () => {
    setIsFilterSelected(true);
  };
  const handleClickResetFilters = () => {
    setIsFilterSelected(false);
  };

  return (
    <StyledOrdersContainer>
      <Typography.Title level={2}>Заказы</Typography.Title>
      <Card>
        <FilterControls
          handleClickSubmitFilter={handleClickSubmitFilter}
          handleClickResetFilters={handleClickResetFilters}
          filters={filters}
          setFilters={setFilters}
        />
        <Table
          showHeader={false}
          pagination={{
            position: ["bottomCenter"],
            current: page,
            ...tableParams.pagination,
            onChange: (_, pageSize) => setLimit(pageSize),
            pageSizeOptions: ["5", "10", "25", "50"],
            defaultPageSize: 5,
            locale: { items_per_page: "" },
            itemRender,
          }}
          dataSource={transformedOrders}
          columns={getOrdersColumns()}
          onChange={handleTableChange}
          loading={isLoading}
          scroll={{ x: 1400 }}
        />
      </Card>
    </StyledOrdersContainer>
  );
}
