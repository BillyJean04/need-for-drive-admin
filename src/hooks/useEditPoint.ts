import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { AlertContext } from "@/providers/AlertProvider";
import { PointField } from "@/types";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useEditPoint() {
  const queryClient = useQueryClient();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setAlertOptions, setIsAlertShowing } = useContext(AlertContext);

  const mutation = useMutation({
    mutationFn: (updatedPoint: {
      id: number;
      name: string;
      address: string;
      cityId: { id: number };
    }) =>
      fetcher({
        endpoint: `${Urls.points}/${updatedPoint.id}`,
        method: "PUT",
        body: JSON.stringify(updatedPoint),
        headers: new Headers(getHeaders()),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["points"] }),
    throwOnError: true,
  });

  const editPoint = async (fieldsValue: PointField) => {
    const { name, id, city, address } = fieldsValue;
    try {
      setConfirmLoading(true);
      await mutation
        .mutateAsync({
          id,
          name,
          address,
          cityId: {
            id: city,
          },
        })
        .then(() => {
          setConfirmLoading(false);

          setIsAlertShowing(true);
          setAlertOptions({ message: "Успех! Пункт выдачи успешно изменен.", type: "success" });
        });
    } catch (error) {
      throw new Error("В процессе изменения пункта выдачи произошла ошибка");
    }
  };

  return {
    editPoint,
    confirmLoading,
  };
}
