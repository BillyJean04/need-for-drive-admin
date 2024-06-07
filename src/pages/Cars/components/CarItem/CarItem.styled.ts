import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledCarItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.menuBorder};

  padding: 15px;
  justify-content: space-around;
  ${mixins.textMixin({ $color: "gray", $fontWeight: 500 })};

  align-items: center;
`;

export const StyledCarItemImage = styled.img`
  height: 90px;
  max-width: 160px;

  object-fit: contain;

  flex: 1;
`;

export const StyledCarItemDescription = styled.div`
  @media (min-width: ${({ theme }) => theme.device.laptop}) {
    flex: 1;
  }

  h3 {
    ${mixins.textMixin({ $color: "black", $fontSize: "font-18" })};
  }
`;

export const StyledCarItemColors = styled.div`
  flex: 1;

  span {
    ${mixins.textMixin({ $color: "black" })};
  }
`;

export const StyledCarItemPrices = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: ${({ theme }) => theme.device.laptopM}) {
    flex: 1;
  }

  span {
    ${mixins.textMixin({ $color: "black" })};
  }

  div {
    span {
      ${mixins.textMixin({ $color: "black" })};
    }
  }
`;

export const StyledCarItemAdditionalInfo = styled.div`
  flex: 1;

  span {
    ${mixins.textMixin({ $color: "black" })};
  }
`;

export const StyledCarItemButtons = styled.div`
  display: flex;
  gap: 25px;
`;
