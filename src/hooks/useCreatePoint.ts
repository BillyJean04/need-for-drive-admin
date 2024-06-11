import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { AlertContext } from "@/providers/AlertProvider";
import { PointField } from "@/types";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useCreatePoint() {
  const queryClient = useQueryClient();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setAlertOptions, setIsAlertShowing } = useContext(AlertContext);

  const mutation = useMutation({
    mutationFn: (newPoint: { name: string; address: string; cityId: { id: number } }) =>
      fetcher({
        endpoint: Urls.points,
        method: "POST",
        body: JSON.stringify(newPoint),
        headers: new Headers(getHeaders()),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
  });

  const createPoint = async (fieldsValue: PointField) => {
    const { name, city, address } = fieldsValue;

    try {
      setConfirmLoading(true);

      await mutation
        .mutateAsync({
          name,
          address,
          cityId: {
            id: city,
          },
        })
        .then(() => {
          setConfirmLoading(false);
          setIsAlertShowing(true);

          setAlertOptions({
            message: "Успех! Пункт выдачи успешно добавлен.",
            type: "success",
          });
        });
    } catch (error) {
      throw new Error("В процесее создания пункта выдачи произошла ошибка");
    }
  };

  return {
    createPoint,
    confirmLoading,
  };
}
