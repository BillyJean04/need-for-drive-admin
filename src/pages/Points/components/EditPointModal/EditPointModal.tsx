import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select } from "antd";
import Cookies from "js-cookie";
import { useContext, useState } from "react";

import { AlertContext } from "@/providers/AlertProvider";
import { FilterOptions } from "@/types";
import { CityApi } from "@/types/api";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

import { EditPointFieldType, UpdatedPoint } from "./types";

interface EditPointModalProps {
  point: {
    id: number;
    name: string;
    address: string;
    city: string;
  };
}

export function EditPointModal({ point }: EditPointModalProps) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { setMessage, setType, setIsAlertShowing } = useContext(AlertContext);

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      fetcher<CityApi>({
        endpoint: Urls.cities,
        headers: new Headers(getHeaders(Cookies.get("access"), "Bearer")),
        method: "GET",
      }).then(
        (res) =>
          ({
            name: "cityId",
            placeholder: "Гороода",
            items: res.data.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          }) satisfies FilterOptions,
      ),
    refetchOnWindowFocus: false,
  });

  const initialCity = cities?.items.find(({ label }) => label === point.city);

  const mutation = useMutation({
    mutationFn: (updatedPoint: UpdatedPoint) =>
      fetcher({
        endpoint: `${Urls.points}/${point.id}`,
        method: "PUT",
        body: JSON.stringify(updatedPoint),
        headers: new Headers(getHeaders()),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["points"] }),
  });

  const editPoint = async () => {
    const { name, cityId, address }: EditPointFieldType = form.getFieldsValue();

    try {
      setConfirmLoading(true);
      await mutation
        .mutateAsync({
          name,
          address,
          cityId: {
            id: cityId.value,
          },
        })
        .then(() => {
          setConfirmLoading(false);

          setIsAlertShowing(true);
          setMessage("Успех! Пункт выдачи успешно изменен.");
          setType("success");
        })
        .finally(() => {
          setOpen(false);
        });
    } catch (error) {
      throw new Error("В процессе изменения пункта выдачи произошла ошибка");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Изменить</Button>
      <Modal
        title="Изменение пункта выдачи"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={editPoint}
        confirmLoading={confirmLoading}
        okText="Изменить"
        cancelText="Отменить"
      >
        <Form layout="vertical" form={form}>
          <Form.Item<EditPointFieldType>
            label="Название"
            name="name"
            initialValue={point.name}
            rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<EditPointFieldType>
            label="Адрес"
            name="address"
            initialValue={point.address}
            rules={[{ required: true, message: "Пожалуйста, введите адрес!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={initialCity}
            label="Город"
            name="cityId"
            rules={[{ required: true, message: "Пожалуйста, выберите город!" }]}
          >
            <Select placeholder="Выберите город">
              {cities?.items.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
