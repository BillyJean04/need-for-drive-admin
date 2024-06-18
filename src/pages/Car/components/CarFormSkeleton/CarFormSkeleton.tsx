import { Button, Form, Input, Skeleton, Space, Typography } from "antd";

import Plus from "@/assets/plus.svg";
import { CarField } from "@/types";

import {
  StyledAddColorButton,
  StyledCarContentWrapper,
  StyledCarImageContainer,
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
} from "../../Car.styled";
import { StyledInputSkeleton } from "./CarFormSkeleton.styled";

export function CarFormSkeleton() {
  return (
    <StyledCarContentWrapper>
      <StyledLeftCard>
        <StyledCarImageContainer>
          <Skeleton.Image style={{ width: "240px", height: "110px" }} />
          <StyledInputSkeleton />
          <StyledInputSkeleton />
          <Form.Item<CarField> name="image" style={{ marginBottom: "0" }}>
            <StyledUpload>
              <StyledUploadDescription>Выберите файл...</StyledUploadDescription>
              <StyledUploadButton showUploadList={false} accept=".JPEG,.PNG,.GIF,.BMP">
                Обзор
              </StyledUploadButton>
            </StyledUpload>
          </Form.Item>
        </StyledCarImageContainer>
        <StyledProgressBar style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span>Заполнено</span>
          <Skeleton title={false} paragraph={{ rows: 1, width: "100%" }} />
        </StyledProgressBar>
        <StyledDescription>
          <span>Описание</span>
          <Input.TextArea rows={4} variant="borderless" style={{ padding: "0", resize: "none" }} />
        </StyledDescription>
      </StyledLeftCard>
      <StyledRightCard>
        <Typography.Title>Настройки автомобиля</Typography.Title>
        <StyledInputsContainer>
          <Form.Item<CarField> label="Модель">
            <StyledInputSkeleton />
          </Form.Item>
          <Form.Item<CarField> label="Категория">
            <StyledInputSkeleton />
          </Form.Item>
          <Form.Item<CarField> label="Минимальная цена">
            <StyledInputSkeleton />
          </Form.Item>
          <Form.Item<CarField> label="Максимальная цена">
            <StyledInputSkeleton />
          </Form.Item>
          <Form.Item<CarField> label="Уровень топлива">
            <StyledInputSkeleton />
          </Form.Item>
          <Form.Item<CarField> label="Регистрационный номер">
            <StyledInputSkeleton />
          </Form.Item>
          <StyledColorsContainer>
            <Form.Item<CarField> label="Доступные цвета">
              <Space>
                <Skeleton.Input />
                <StyledAddColorButton $disabled type="button">
                  <Plus />
                </StyledAddColorButton>
              </Space>
            </Form.Item>
            <Form.Item<CarField> name="colors">
              <StyledColorsCheckboxesContainer />
            </Form.Item>
          </StyledColorsContainer>
        </StyledInputsContainer>
        <StyledFormButtons>
          <div>
            <Button type="primary">Сохранить</Button>
            <Button>Отменить</Button>
          </div>
          <Button type="primary" danger>
            Удалить
          </Button>
        </StyledFormButtons>
      </StyledRightCard>
    </StyledCarContentWrapper>
  );
}
