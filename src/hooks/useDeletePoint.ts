import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, Key, SetStateAction, useContext, useState } from "react";

import { AlertContext } from "@/providers/AlertProvider";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useDeletePoint({
  selectedRows,
  setSelectedRowKeys,
}: {
  selectedRows: Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<Key[]>>;
}) {
  const queryClient = useQueryClient();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setAlertOptions, setIsAlertShowing } = useContext(AlertContext);

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
      setAlertOptions({
        message: "Успех! Пункт выдачи успешно удален",
        type: "success",
      });
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

  return {
    deletePoint,
    confirmLoading,
  };
}
