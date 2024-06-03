import { Card, Empty, Pagination, Typography } from "antd";
import { useState } from "react";

import { useOrdersQuery } from "@/hooks";
import { Filters } from "@/types";
import { createRenderArray } from "@/utils";
import { itemRender } from "@/utils/paginationItemRender";

import { FilterControls, OrderItem, OrderItemSkeleton } from "./components";
import {
  StyledEmptyData,
  StyledOrdersContainer,
  StyledOrdersItemsContainer,
} from "./Orders.styled";

export function Orders() {
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<Filters>({});

  const { orders, setPage, setLimit, limit, total, isLoading } = useOrdersQuery({
    filters,
  });

  return (
    <StyledOrdersContainer>
      <Typography.Title level={2}>Заказы</Typography.Title>
      <Card>
        <FilterControls setFilters={setFilters} />
        <StyledOrdersItemsContainer>
          {isLoading && createRenderArray(limit).map((item) => <OrderItemSkeleton key={item} />)}
          {orders?.map((order) => <OrderItem key={order.id} order={order} />)}
        </StyledOrdersItemsContainer>
        {!isLoading && orders?.length === 0 && (
          <StyledEmptyData>
            <Empty description="Нет данных" />
          </StyledEmptyData>
        )}
        <Pagination
          showLessItems
          itemRender={itemRender}
          defaultPageSize={5}
          responsive
          hideOnSinglePage
          total={total ?? totalPages}
          onChange={(page, pageSize) => {
            setPage(page - 1);
            setLimit(pageSize);
            setTotalPages((prev) => total ?? prev);
          }}
          showSizeChanger={false}
        />
      </Card>
    </StyledOrdersContainer>
  );
}
