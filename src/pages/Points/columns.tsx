import { ColumnsType } from "antd/es/table";

import { EditPointModal } from "./components";
import { PointsTableDataType } from "./types";

export const columns: ColumnsType<PointsTableDataType> = [
  {
    key: "name",
    title: "Название",
    dataIndex: "name",
    render: (name) => `${name}`,
    width: "35%",
  },
  {
    key: "address",
    title: "Адрес",
    dataIndex: "address",
    render: (address) => `${address}`,
    width: "30%",
  },
  {
    key: "city",
    title: "Город",
    dataIndex: "city",
    render: (city) => `${city}`,
    width: "30%",
  },
  {
    render: (_, record: PointsTableDataType) => <EditPointModal point={record} />,
  },
];
