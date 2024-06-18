import { Button } from "antd";
import { Link } from "react-router-dom";

import { Car } from "@/types";
import { formatNumber } from "@/utils";

import {
  StyledCarItemAdditionalInfo,
  StyledCarItemButtons,
  StyledCarItemColors,
  StyledCarItemContainer,
  StyledCarItemDescription,
  StyledCarItemImage,
  StyledCarItemPrices,
} from "./CarItem.styled";

interface CarItemProps {
  car: Car;
}

export function CarItem({
  car: { image, name, description, colors, priceMin, priceMax, number, tank, id },
}: CarItemProps) {
  return (
    <StyledCarItemContainer>
      <StyledCarItemImage src={image} alt="" />
      <StyledCarItemDescription>
        <h3>{name}</h3>
        <p>{description}</p>
      </StyledCarItemDescription>
      <StyledCarItemColors>
        <span>Цвета: </span>
        {colors.map((color, index) => (
          <span key={color}>{index < colors.length - 1 ? `${color}, ` : color}</span>
        ))}
      </StyledCarItemColors>
      <StyledCarItemPrices>
        <span>Цена:</span>
        <div>
          <span>От:</span> {formatNumber(Number(priceMin))} ₽
          <br />
          <span>До:</span> {formatNumber(Number(priceMax))} ₽
        </div>
      </StyledCarItemPrices>
      <StyledCarItemAdditionalInfo>
        <span>Регистрационный номер:</span> {number}
        <br />
        <span>Уроовень топлива:</span> {tank}
      </StyledCarItemAdditionalInfo>
      <StyledCarItemButtons>
        <Link to={`/dashboard/car/${id}`}>
          <Button type="primary">Редактировать</Button>
        </Link>
      </StyledCarItemButtons>
    </StyledCarItemContainer>
  );
}
