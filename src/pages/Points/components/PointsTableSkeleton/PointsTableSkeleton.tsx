import { Table } from "antd";

import { createRenderArray } from "@/utils";

import { columns } from "./columns";

export function PointsTableSkeleton({ limit }: { limit: number }) {
  const mockTableData = createRenderArray(limit).map((_, index) => ({
    key: index,
    id: 1,
    address: "",
    name: "",
    city: "",
  }));

  return <Table columns={columns} dataSource={mockTableData} pagination={false} />;
}
