import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";

import { useCitiesQuery } from "@/hooks";
import { PointField } from "@/types";

interface ProcessingPointModalProps {
  title: string;
  openButtonText: string;
  okButtonText: string;
  cancelButtonText: string;
  action: (fieldsValue: PointField) => Promise<void>;
  isLoading: boolean;
  initialValues: {
    id: number;
    name: string;
    address: string;
    city: string;
  };
}

export function ProcessingPointModal({
  title,
  openButtonText,
  okButtonText,
  cancelButtonText,
  action,
  isLoading,
  initialValues,
}: ProcessingPointModalProps) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<PointField>();
  const cities = useCitiesQuery();

  const cityId = cities?.items.find(({ label }) => label === initialValues.city)?.value;

  const handleClickOpen = () => {
    setOpen(true);
    form.setFieldsValue({
      ...initialValues,
      city: cityId,
    });
  };

  const handleClickOk = () => {
    form
      .validateFields()
      .then(() =>
        action({
          ...form.getFieldsValue(),
          id: initialValues.id,
          city: form.getFieldValue("city"),
        }).finally(() => setOpen(false)),
      )
      .catch(() => {});
  };

  const handleSelect = () => {
    form.setFieldValue("name", "");
    form.setFieldValue("address", "");
  };

  return (
    <>
      <Button onClick={handleClickOpen}>{openButtonText}</Button>
      <Modal
        title={title}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleClickOk}
        confirmLoading={isLoading}
        okText={okButtonText}
        okButtonProps={{}}
        cancelText={cancelButtonText}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item<PointField>
            label="Город"
            name="city"
            rules={[{ required: true, message: "Пожалуйста, выберите город!" }]}
            initialValue={initialValues.city}
          >
            <Select onSelect={handleSelect} placeholder="Выберите город">
              {cities?.items.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<PointField>
            label="Название"
            name="name"
            rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
            initialValue={initialValues.name}
          >
            <Input />
          </Form.Item>
          <Form.Item<PointField>
            label="Адрес"
            name="address"
            rules={[{ required: true, message: "Пожалуйста, введите адрес!" }]}
            initialValue={initialValues.address}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
