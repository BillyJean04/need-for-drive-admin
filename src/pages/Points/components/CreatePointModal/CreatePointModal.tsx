import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select } from "antd";
import { useContext, useState } from "react";

import { AlertContext } from "@/providers/AlertProvider";
import { getHeaders } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

import { CreatePointFieldType, NewPoint } from "./types";

interface CreatePointModalProps {
  cities?: { value: number; label: string }[];
}

export function CreatePointModal({ cities }: CreatePointModalProps) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { setMessage, setType, setIsAlertShowing } = useContext(AlertContext);

  const mutation = useMutation({
    mutationFn: (newPoint: NewPoint) =>
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

  const createPoint = async () => {
    const { name, cityId, address }: CreatePointFieldType = form.getFieldsValue();

    try {
      setConfirmLoading(true);

      await mutation
        .mutateAsync({
          name,
          address,
          cityId: {
            id: cityId,
          },
        })
        .then(() => {
          setConfirmLoading(false);
          setIsAlertShowing(true);
          setMessage("Успех! Пункт выдачи успешно добавлен.");
          setType("success");
        })
        .finally(() => {
          setOpen(false);
        });
    } catch (error) {
      throw new Error("В процесее создания пункта выдачи произошла ошибка");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Добавить пункт выдачи</Button>
      <Modal
        title="Добавление пункта выдачи"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={createPoint}
        confirmLoading={confirmLoading}
        okText="Добавить"
        cancelText="Отменить"
      >
        <Form layout="vertical" form={form}>
          <Form.Item<CreatePointFieldType>
            label="Название"
            name="name"
            rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<CreatePointFieldType>
            label="Адрес"
            name="address"
            rules={[{ required: true, message: "Пожалуйста, введите адрес!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Город"
            name="cityId"
            rules={[{ required: true, message: "Пожалуйста, выберите город!" }]}
          >
            <Select placeholder="Выберите город">
              {cities?.map(({ value, label }) => (
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
