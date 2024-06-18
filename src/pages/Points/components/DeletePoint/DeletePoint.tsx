import { Button, Modal } from "antd";
import { Dispatch, Key, SetStateAction } from "react";

import { useDeletePoint } from "@/hooks/Point";

export interface DeletePointProps {
  selectedRows: Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<Key[]>>;
}

const { confirm } = Modal;

const showPropsConfirm = (deletePoint: () => void) => {
  confirm({
    title: "Вы действительно хотите удалить пункт выдачи?",
    content: "Это действие нельзя будет отменить!",
    okText: "Удалить",
    okType: "danger",
    cancelText: "Отменить",

    onOk() {
      deletePoint();
    },
  });
};

export function DeletePoint({ selectedRows, setSelectedRowKeys }: DeletePointProps) {
  const { deletePoint } = useDeletePoint({ selectedRows, setSelectedRowKeys });

  return (
    <Button onClick={() => showPropsConfirm(deletePoint)} danger>
      Удалить {selectedRows.length}
    </Button>
  );
}
