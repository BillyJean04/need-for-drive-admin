import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { Dispatch, Key, SetStateAction, useContext, useState } from "react";

import { AlertContext } from "@/providers/AlertProvider";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export interface DeletePointProps {
  selectedRows: Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<Key[]>>;
}

const { confirm } = Modal;

const showPropsConfirm = (deletePoint: () => void, confirmLoading: boolean) => {
  confirm({
    title: "Вы действительно хотите удалить пункт выдачи?",
    content: "Это действие нельзя будет отменить!",
    okText: "Удалить",
    okType: "danger",
    cancelText: "Отменить",
    okButtonProps: {
      loading: confirmLoading,
    },
    onOk() {
      deletePoint();
    },
  });
};

export function DeletePoint({
  selectedRows,
  // setIsPointDeleted,
  setSelectedRowKeys,
}: DeletePointProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setMessage, setType, setIsAlertShowing } = useContext(AlertContext);

  const mutation = useMutation({
    mutationFn: (id: number) =>
      fetcher({
        endpoint: `${Urls.points}/${id}`,
        method: "DELETE",
        headers: new Headers(getHeaders()),
      }),
    onSuccess: () => {
      setSelectedRowKeys([]);
      queryClient.invalidateQueries({ queryKey: ["points"] });

      setIsAlertShowing(true);
      setMessage("Успех! Пункт выдачи успешно удален.");
      setType("success");
    },
  });

  const deletePoint = async () => {
    try {
      setConfirmLoading(true);
      const id = selectedRows[0] as number;

      await mutation.mutateAsync(id);
    } catch (error) {
      throw new Error("В процесее удаления пункта выдачи произошла ошибка");
    }
  };

  return (
    <Button onClick={() => showPropsConfirm(deletePoint, confirmLoading)} danger>
      Удалить {selectedRows.length}
    </Button>
  );
}
