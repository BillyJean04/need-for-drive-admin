import { Radio } from "antd";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import Check from "@/assets/check.svg";
import Edit from "@/assets/edit.svg";
import Reject from "@/assets/reject.svg";
import { Order } from "@/types";
import { formatNumber } from "@/utils";
import { routesPaths } from "@/utils/consts/routes";

import {
  StyledCheckbox,
  StyledCheckboxContainer,
  StyledCheckboxWrapper,
  StyledOrderInfo,
  StyledOrderItem,
  StyledOrderItemImage,
  StyledPrice,
  StyledRadioButtonGroup,
} from "./OrderItem.styled";

interface OrderItemProps {
  order: Order;
}

export function OrderItem({ order }: OrderItemProps) {
  return (
    <StyledOrderItem>
      <StyledOrderItemImage src={order.image} alt="car-image" />
      <StyledOrderInfo>
        <span>{order.orderInfo.model} </span> в <span>{order.orderInfo.city}</span>,{" "}
        {order.orderInfo.point}
        <br />
        {format(Number(order.orderInfo.dateFrom), "dd.MM.yyyy HH:mm")} -{" "}
        {format(Number(order.orderInfo.dateTo), "dd.MM.yyyy HH:mm ")}
        <br />
        Цвет: <span>{order.orderInfo.color}</span>
      </StyledOrderInfo>
      <StyledCheckboxWrapper>
        <StyledCheckboxContainer>
          <StyledCheckbox $checked={order.additional.isFullTank}>Полный бак</StyledCheckbox>
          <StyledCheckbox $checked={order.additional.isNeedChildChair}>
            Детское кресло
          </StyledCheckbox>
          <StyledCheckbox $checked={order.additional.isRightWheel}>Правый руль</StyledCheckbox>
        </StyledCheckboxContainer>
      </StyledCheckboxWrapper>
      <StyledPrice>{formatNumber(order.price)} ₽</StyledPrice>
      <StyledRadioButtonGroup>
        <Radio.Button value="large">
          <Check />
          Готово
        </Radio.Button>
        <Radio.Button value="middle">
          <Reject />
          Отмена
        </Radio.Button>
        <Radio.Button value="small">
          <Edit />
          <Link to={`${routesPaths.orders}/${order.id}`}>Изменить</Link>
        </Radio.Button>
      </StyledRadioButtonGroup>
    </StyledOrderItem>
  );
}
