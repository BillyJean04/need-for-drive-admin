import { Alert, Card, Typography } from "antd";
import { Key, useContext, useState } from "react";

import { FilterControls } from "@/components";
import { useCreatePoint, usePointsQuery } from "@/hooks/Point";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";
import { AlertContext } from "@/providers/AlertProvider";
import { StyledPagination } from "@/styles/global.styled";
import { Point } from "@/types";
import { calculatePageData } from "@/utils";
import { itemRender } from "@/utils/paginationItemRender";

import { DeletePoint, PointsTable, PointsTableSkeleton, ProcessingPointModal } from "./components";
import { StyledPointsContainer } from "./Points.styled";

export function Points() {
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<{ cityId?: number }>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const cities = useCitiesQuery();

  const {
    isAlertShowing,
    setIsAlertShowing,
    alertOptions: { message, type },
  } = useContext(AlertContext);

  const { createPoint, confirmLoading } = useCreatePoint();

  const { points, count, isLoading, page, limit, setPage, setLimit } = usePointsQuery({
    filters,
  });

  const pointsPerPage = calculatePageData<Point>({ data: points ?? [], page, pageLimit: limit });

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      {isAlertShowing && (
        <Alert
          afterClose={() => setIsAlertShowing(false)}
          closable
          style={{ position: "absolute", width: "100%" }}
          message={message}
          type={type}
        />
      )}
      <StyledPointsContainer>
        <Typography.Title level={2}>Пункты выдачи</Typography.Title>
        <Card>
          <FilterControls
            setPage={setPage}
            setFilters={setFilters}
            options={cities ? [cities] : []}
          >
            <ProcessingPointModal
              initialValues={{
                id: 0,
                name: "",
                city: "",
                address: "",
              }}
              isLoading={confirmLoading}
              action={createPoint}
              title="Добавление пункта выдачи"
              cancelButtonText="Отменить"
              okButtonText="Добавить"
              openButtonText="Добавить пункт выдачи"
            />
            {hasSelected && (
              <DeletePoint selectedRows={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />
            )}
          </FilterControls>
          {isLoading ? (
            <PointsTableSkeleton limit={limit} />
          ) : (
            <PointsTable
              pagination={false}
              rowKey={(record) => record.id}
              rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
              showSorterTooltip={false}
              dataSource={pointsPerPage}
            />
          )}
          <StyledPagination
            showLessItems
            itemRender={itemRender}
            defaultPageSize={5}
            responsive
            hideOnSinglePage
            current={page + 1}
            total={count ?? totalPages}
            onChange={(currentPage, pageSize) => {
              setPage(currentPage - 1);
              setLimit(pageSize);
              setTotalPages((prev) => count ?? prev);
            }}
            showSizeChanger={false}
          />
        </Card>
      </StyledPointsContainer>
    </>
  );
}
