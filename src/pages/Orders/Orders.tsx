import { Card, Empty, Typography } from "antd";
import { useState } from "react";

import { FilterControls } from "@/components";
import { useOrdersFilters, useOrdersQuery } from "@/hooks/Order";
import { StyledPagination } from "@/styles/global.styled";
import { createRenderArray } from "@/utils";
import { itemRender } from "@/utils/paginationItemRender";

import { OrderItem, OrderItemSkeleton } from "./components";
import {
  StyledEmptyData,
  StyledOrdersContainer,
  StyledOrdersItemsContainer,
} from "./Orders.styled";

export function Orders() {
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<{ city?: number; model?: number; status?: number }>({});

  const { orders, setPage, setLimit, limit, total, isLoading } = useOrdersQuery({
    filters,
  });

  const options = useOrdersFilters();

  return (
    <StyledOrdersContainer>
      <Typography.Title level={2}>Заказы</Typography.Title>
      <Card>
        <FilterControls setPage={setPage} setFilters={setFilters} options={options} />
        <StyledOrdersItemsContainer>
          {isLoading && createRenderArray(limit).map((item) => <OrderItemSkeleton key={item} />)}
          {orders?.map((order) => <OrderItem key={order.id} order={order} />)}
        </StyledOrdersItemsContainer>
        {!isLoading && orders?.length === 0 && (
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
          total={total ?? totalPages}
          onChange={(currentPage, pageSize) => {
            setPage(currentPage - 1);
            setLimit(pageSize);
            setTotalPages((prev) => total ?? prev);
          }}
          showSizeChanger={false}
        />
      </Card>
    </StyledOrdersContainer>
  );
}
