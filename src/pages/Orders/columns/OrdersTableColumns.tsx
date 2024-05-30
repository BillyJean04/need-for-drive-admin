import { Image, Radio } from "antd";
import { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import Check from "@/assets/check.svg";
import Edit from "@/assets/edit.svg";
import Reject from "@/assets/reject.svg";
import { formatNumber } from "@/utils";
import { routesPaths } from "@/utils/consts/routes";

import {
  StyledCheckbox,
  StyledCheckboxContainer,
  StyledOrderInfo,
  StyledPrice,
  StyledRadioButtonGroup,
} from "./OrdersTableColumns.styled";

export interface OrderTableDataType {
  id: number;
  image: string;
  orderInfo: {
    model: string;
    city: string;
    point: string;
    dateTo: string;
    dateFrom: string;
    color: string;
  };
  additional: {
    isFullTank: boolean;
    isNeedChildChair: boolean;
    isRightWheel: boolean;
  };
  price: number;
}

export function getOrdersColumns(): ColumnsType<OrderTableDataType> {
  return [
    {
      title: "image",
      dataIndex: "image",
      sorter: true,
      render: (image) => (
        <Image
          width={138}
          height={63}
          style={{ objectFit: "contain" }}
          src={image}
          alt="car-image"
        />
      ),
      width: "10%",
    },
    {
      title: "orderInfo",
      dataIndex: "orderInfo",
      render: (orderInfo) => (
        <StyledOrderInfo>
          <span>{orderInfo.model} </span> в <span>{orderInfo.city}</span>, {orderInfo.point}
          <br />
          {format(Number(orderInfo.dateFrom), "dd.MM.yyyy HH:mm")} -{" "}
          {format(Number(orderInfo.dateTo), "dd.MM.yyyy HH:mm ")}
          <br />
          Цвет: <span>{orderInfo.color}</span>
        </StyledOrderInfo>
      ),
      width: "35%",
    },
    {
      title: "additional",
      dataIndex: "additional",
      render: (additional) => (
        <StyledCheckboxContainer>
          <StyledCheckbox $checked={additional.isFullTank}>Полный бак</StyledCheckbox>
          <StyledCheckbox $checked={additional.isNeedChildChair}>Детское кресло</StyledCheckbox>
          <StyledCheckbox $checked={additional.isRightWheel}>Правый руль</StyledCheckbox>
        </StyledCheckboxContainer>
      ),
      width: "15%",
    },
    {
      title: "price",
      dataIndex: "price",
      render: (price) => <StyledPrice>{formatNumber(price)} ₽</StyledPrice>,
      width: "15%",
    },
    {
      title: "Action",
      key: "operation",
      render: ({ id }) => (
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
            <Link to={`${routesPaths.orders}/${id}`}>Изменить</Link>
          </Radio.Button>
        </StyledRadioButtonGroup>
      ),
      width: "35%",
    },
  ];
}
