import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { AlertContext } from "@/providers/AlertProvider";
import { CarMutation } from "@/types";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

export function useProcessingCar() {
  const mutation = useMutation({
    mutationFn: (carData: CarMutation) =>
      fetcher({
        endpoint: carData.id ? `${Urls.cars}/${carData.id}` : Urls.cars,
        method: carData.id ? "PUT" : "POST",
        body: JSON.stringify(carData),
        headers: new Headers(getHeaders()),
      }),
    throwOnError: true,
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setAlertOptions, setIsAlertShowing } = useContext(AlertContext);

  const processing = async (car: CarMutation, id?: string) => {
    try {
      setConfirmLoading(true);

      await mutation
        .mutateAsync({
          id,
          ...car,
        })
        .then(() => {
          setConfirmLoading(false);
          setIsAlertShowing(true);

          setAlertOptions({
            message: `Успех! Карточка автомобиля ${id ? "изменена" : "создана"}.`,
            type: "success",
          });
        });
    } catch (error) {
      throw new Error(
        `В процесее ${id ? "изменения" : "создания"} карточки автомобиля произошла ошибка`,
      );
    }
  };

  return {
    processing,
    confirmLoading,
  };
}
