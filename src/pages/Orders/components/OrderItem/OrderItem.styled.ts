import { Checkbox, Radio } from "antd";
import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledOrderItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.menuBorder};
`;

export const StyledRadioButtonGroup = styled(Radio.Group)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.device.mobileL}) {
    flex-direction: column;
    align-items: stretch;
    flex: 0;
  }

  label {
    @media (max-width: ${({ theme }) => theme.device.mobileM}) {
      // override default ant design styles

      border-radius: 0 !important;
    }
    span:last-child {
      display: flex;
      align-items: center;
      gap: 3px;

      font-weight: 500;
    }
  }

  label:nth-child(1) {
    span:last-child {
      svg {
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  label:nth-child(1):hover {
    color: ${({ theme }) => theme.colors.green};
  }

  label:nth-child(2) {
    span:last-child {
      svg {
        color: ${({ theme }) => theme.colors.red};
      }
    }
  }

  label:nth-child(2):hover {
    color: ${({ theme }) => theme.colors.red};
  }

  label:nth-child(3) {
    span:last-child {
      svg {
        color: ${({ theme }) => theme.colors.lightBlue};
      }
    }
  }

  label:nth-child(3):hover {
    color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

export const StyledPrice = styled.div`
  ${mixins.textMixin({ $fontSize: "font-24", $fontWeight: 500 })};

  text-align: center;
  flex: 1;
  min-width: 9ch;
`;

export const StyledOrderInfo = styled.div`
  ${mixins.textMixin({ $color: "gray", $fontWeight: 500 })};
  flex: 1.1;
  min-width: min(15rem, 100%);

  span {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const StyledOrderItemImage = styled.img`
  height: 90px;
  max-width: 160px;

  object-fit: contain;

  flex: 1;
`;

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  flex: 1;
`;

export const StyledCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCheckbox = styled(Checkbox)<{ $checked: boolean }>`
  ${mixins.textMixin({ $fontWeight: 500, $color: "gray" })};
  color: ${({ theme, $checked }) => ($checked ? theme.colors.black : theme.colors.gray)};

  pointer-events: none;
  span:first-child {
    position: relative;

    .ant-checkbox-input {
      opacity: 1;
    }
    border-radius: 1px;

    input:before {
      content: "";
      display: block;
      position: absolute;
      width: 17px;
      height: 17px;
      top: 0;
      left: 0;
      border-radius: 1px;
      border: 1px solid
        ${({ theme, $checked }) => ($checked ? theme.colors.green : theme.colors.lightBlue)};
      background-color: ${({ theme }) => theme.colors.white};
      z-index: 10;
    }

    input:after {
      content: "";
      display: ${({ $checked }) => ($checked ? "block" : "none")};
      width: 5px;
      height: 10px;
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.black};
      border-image: initial;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      position: absolute;
      top: 2px;
      left: 7px;
      z-index: 20;
    }
  }
`;
