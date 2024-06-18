import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Progress,
  Select,
  Space,
  Typography,
} from "antd";
import { isEmpty } from "lodash";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Placeholder from "@/assets/image-placeholder.png";
import Plus from "@/assets/plus.svg";
import { useCarForm, useProcessingCar } from "@/hooks/Car";
import { useDeleteCar } from "@/hooks/Car/useDeleteCar";
import {
  StyledAddColorButton,
  StyledCarCategoryText,
  StyledCarContainer,
  StyledCarContentWrapper,
  StyledCarImageContainer,
  StyledCarModelText,
  StyledCarText,
  StyledColorsCheckboxesContainer,
  StyledColorsContainer,
  StyledDescription,
  StyledFormButtons,
  StyledInputsContainer,
  StyledLeftCard,
  StyledProgressBar,
  StyledRightCard,
  StyledUpload,
  StyledUploadButton,
  StyledUploadDescription,
} from "@/pages/Car/Car.styled";
import { AlertContext } from "@/providers/AlertProvider";
import { CarField } from "@/types";
import { transformCarData } from "@/utils";

import { CarFormSkeleton } from "./components/CarFormSkeleton";

export function Car() {
  const {
    form,
    categories,
    imageValue,
    modelValue,
    colorValue,
    colorsValue,
    categoryValue,
    countFilled,
    isLoading,
    handleSelectCategory,
    handleUpload,
    handleClickAddColor,
  } = useCarForm();

  const {
    isAlertShowing,
    setIsAlertShowing,
    alertOptions: { message, type },
  } = useContext(AlertContext);

  const { carId } = useParams();
  const navigate = useNavigate();

  const { processing, confirmLoading } = useProcessingCar();
  const { deleteCar, confirmLoading: isDeleteLoading } = useDeleteCar();

  const handleClickSubmit = () => {
    form
      .validateFields()
      .then(() => {
        const formFields = form.getFieldsValue();
        const categoryId = categories?.items.find(
          ({ label }) => label === formFields.category,
        )?.value;

        const transformedData = transformCarData(formFields, categoryId);

        processing(transformedData, carId);
      })
      .catch(() => {});
  };

  return (
    <>
      {isAlertShowing && (
        <Alert
          afterClose={() => setIsAlertShowing(false)}
          closable
          style={{ position: "absolute", width: "100%" }}
          message={message}
          type={type}
        />
      )}
      <StyledCarContainer>
        <Typography.Title level={2}>Карточка автомобиля</Typography.Title>
        <Form form={form} layout="vertical">
          {isLoading ? (
            <CarFormSkeleton />
          ) : (
            <StyledCarContentWrapper>
              <StyledLeftCard>
                <StyledCarImageContainer>
                  <img src={imageValue ?? Placeholder} alt="" />
                  <StyledCarText>
                    <StyledCarModelText>
                      {modelValue?.length ? modelValue : "Модель не указана"}
                    </StyledCarModelText>
                    <StyledCarCategoryText>
                      {categoryValue?.length ? categoryValue : "Категория не указана"}
                    </StyledCarCategoryText>
                  </StyledCarText>
                  <Form.Item<CarField>
                    initialValue={form.getFieldValue("image")}
                    rules={[
                      { required: true, message: "Пожалуйста, загрузите изображение автомобиля!" },
                    ]}
                    name="image"
                    style={{ marginBottom: "0" }}
                  >
                    <StyledUpload>
                      <StyledUploadDescription>Выберите файл...</StyledUploadDescription>
                      <StyledUploadButton
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleUpload(file);
                          return false;
                        }}
                        accept=".JPEG,.PNG,.GIF,.BMP"
                      >
                        Обзор
                      </StyledUploadButton>
                    </StyledUpload>
                  </Form.Item>
                </StyledCarImageContainer>
                <StyledProgressBar>
                  <span>Заполнено</span>
                  <Progress type="line" percent={countFilled.length * 13} />
                </StyledProgressBar>
                <StyledDescription>
                  <span>Описание</span>
                  <Form.Item<CarField>
                    name="description"
                    initialValue={form.getFieldValue("description")}
                  >
                    <Input.TextArea
                      rows={4}
                      variant="borderless"
                      style={{ padding: "0", resize: "none" }}
                    />
                  </Form.Item>
                </StyledDescription>
              </StyledLeftCard>
              <StyledRightCard>
                <Typography.Title>Настройки автомобиля</Typography.Title>
                <StyledInputsContainer>
                  <Form.Item<CarField>
                    name="model"
                    label="Модель"
                    initialValue={form.getFieldValue("model")}
                    rules={[
                      {
                        whitespace: false,
                        required: true,
                        message: "Пожалуйста, введите название модели!!",
                      },
                      {
                        max: 150,
                        message: "Длина названия модели не должна превышать 150 символов!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item<CarField>
                    name="category"
                    label="Категория"
                    initialValue={form.getFieldValue("category")}
                    rules={[{ required: true, message: "Пожалуйста, выберите категорию!" }]}
                  >
                    <Select onSelect={handleSelectCategory} placeholder="Выберите категорию">
                      {categories?.items.map(({ value, label }) => (
                        <Select.Option key={value} value={value}>
                          {label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item<CarField>
                    name="priceMin"
                    label="Минимальная цена"
                    rules={[{ required: true, message: "Пожалуйста, введите минимальную цену!" }]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item<CarField>
                    name="priceMax"
                    label="Максимальная цена"
                    rules={[{ required: true, message: "Пожалуйста, введите максимальную цену!" }]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item<CarField>
                    name="tank"
                    label="Уровень топлива"
                    rules={[{ required: true, message: "Пожалуйста, введите уровень топлива!" }]}
                  >
                    <InputNumber min={0} max={100} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item<CarField>
                    name="number"
                    label="Регистрационный номер"
                    rules={[
                      { required: true, message: "Пожалуйста, введите регистрационный номер!" },
                    ]}
                  >
                    <Input maxLength={6} />
                  </Form.Item>
                  <StyledColorsContainer>
                    <Form.Item<CarField>
                      label="Доступные цвета"
                      name="color"
                      rules={[
                        {
                          whitespace: false,
                          required: isEmpty(form.getFieldValue("colors")),
                          message: "Пожалуйста, введите цвет!!",
                        },
                        {
                          max: 150,
                          message: "Длина цвета не должна превышать 150 символов!",
                        },
                      ]}
                      style={{ marginBottom: "10px" }}
                    >
                      <Space>
                        <Input />
                        <StyledAddColorButton
                          $disabled={isEmpty(colorValue)}
                          onClick={handleClickAddColor}
                          type="button"
                        >
                          <Plus />
                        </StyledAddColorButton>
                      </Space>
                    </Form.Item>
                    <Form.Item<CarField> name="colors">
                      <StyledColorsCheckboxesContainer>
                        {colorsValue?.map((color: string) => (
                          <Checkbox
                            key={color}
                            checked
                            value={color}
                            style={{ lineHeight: "32px" }}
                          >
                            {color}
                          </Checkbox>
                        ))}
                      </StyledColorsCheckboxesContainer>
                    </Form.Item>
                  </StyledColorsContainer>
                </StyledInputsContainer>
                <StyledFormButtons>
                  <div>
                    <Button onClick={handleClickSubmit} loading={confirmLoading} type="primary">
                      Сохранить
                    </Button>
                    <Button onClick={() => navigate(-1)}>Отменить</Button>
                  </div>
                  {carId && (
                    <Button
                      onClick={() => deleteCar(carId)}
                      loading={isDeleteLoading}
                      type="primary"
                      danger
                    >
                      Удалить
                    </Button>
                  )}
                </StyledFormButtons>
              </StyledRightCard>
            </StyledCarContentWrapper>
          )}
        </Form>
      </StyledCarContainer>
    </>
  );
}
