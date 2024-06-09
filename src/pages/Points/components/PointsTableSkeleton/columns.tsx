import { Skeleton } from "antd";
import { ColumnsType } from "antd/es/table";

import { PointsTableDataType } from "@/pages/Points/types";

export const columns: ColumnsType<PointsTableDataType> = [
  {
    title: "Название",
    dataIndex: "name",
    render: () => <Skeleton title={false} paragraph={{ rows: 1 }} />,
    width: "35%",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    render: () => <Skeleton title={false} paragraph={{ rows: 1 }} />,
    width: "30%",
  },
  {
    title: "Город",
    dataIndex: "city",
    render: () => <Skeleton title={false} paragraph={{ rows: 1 }} />,
    width: "30%",
  },
];
