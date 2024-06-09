import { useQuery } from "@tanstack/react-query";
import { Alert, Card, Table, Typography } from "antd";
import Cookies from "js-cookie";
import { Key, useContext, useState } from "react";

import { FilterControls } from "@/components";
import { usePointsQuery } from "@/hooks";
import { columns } from "@/pages/Points/columns";
import { AlertContext } from "@/providers/AlertProvider";
import { StyledPagination } from "@/styles/global.styled";
import { FilterOptions, Point } from "@/types";
import { CityApi } from "@/types/api";
import { calculatePageData, getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";
import { itemRender } from "@/utils/paginationItemRender";

import { CreatePointModal, DeletePoint, PointsTableSkeleton } from "./components";
import { StyledPointsContainer } from "./Points.styled";

export function Points() {
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<{ cityId?: number }>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { isAlertShowing, setIsAlertShowing, type, message } = useContext(AlertContext);

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
            <CreatePointModal cities={cities?.items} />
            {hasSelected && (
              <DeletePoint selectedRows={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />
            )}
          </FilterControls>
          {isLoading ? (
            <PointsTableSkeleton limit={limit} />
          ) : (
            <Table
              rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
              rowKey={(record) => record.id}
              showSorterTooltip={false}
              columns={columns}
              dataSource={pointsPerPage}
              pagination={false}
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
