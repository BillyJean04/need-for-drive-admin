import { Table, TableProps } from "antd";

import { useEditPoint } from "@/hooks/Point";
import { ProcessingPointModal } from "@/pages/Points/components";

const { Column } = Table;

export interface PointsTableProps extends TableProps {}

export function PointsTable({ ...props }: PointsTableProps) {
  const { editPoint, confirmLoading } = useEditPoint();

  return (
    <Table {...props}>
      <Column
        title="Название"
        dataIndex="name"
        key="name"
        width="30% "
        render={(name) => `${name}`}
      />
      <Column
        title="Адрес"
        dataIndex="address"
        key="address"
        width="30%"
        render={(address) => `${address}`}
      />
      <Column title="Город" dataIndex="city" key="city" width="30%" />
      <Column
        render={(_, record: { id: number; name: string; address: string; city: string }) => (
          <ProcessingPointModal
            title="Изменение пункта выдачи"
            cancelButtonText="Отменить"
            okButtonText="Изменить"
            openButtonText="Изменить"
            action={editPoint}
            isLoading={confirmLoading}
            initialValues={{
              id: record.id,
              name: record.name,
              address: record.address,
              city: record.city,
            }}
          />
        )}
      />
    </Table>
  );
}
