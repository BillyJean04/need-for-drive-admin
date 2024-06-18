import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertContext } from "@/providers/AlertProvider";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useDeleteCar() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setAlertOptions, setIsAlertShowing } = useContext(AlertContext);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (id?: string) =>
      fetcher({
        endpoint: `${Urls.cars}/${id}`,
        method: "DELETE",
        headers: new Headers(getHeaders()),
      }),
    onSuccess: () => {
      setIsAlertShowing(true);
      setAlertOptions({
        message: "Успех! Карточка автомобиля удалена",
        type: "success",
      });
    },
    throwOnError: true,
  });

  const deleteCar = async (id?: string) => {
    try {
      setConfirmLoading(true);

      await mutation.mutateAsync(id).finally(() => {
        setConfirmLoading(false);

        setTimeout(() => {
          navigate(-1);
        }, 3000);
      });
    } catch (error) {
      throw new Error("В процесее удаления карточки автомобиля произошла ошибка");
    }
  };

  return {
    deleteCar,
    confirmLoading,
  };
}
