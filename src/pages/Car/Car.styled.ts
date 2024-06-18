import { Card, Checkbox, Upload } from "antd";
import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledCarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 27px;

  @media (max-width: ${({ theme }) => theme.device.mobileM}) {
    padding: 0 10px;
  }

  .ant-typography {
    ${mixins.textMixin({ $color: "darkBlue", $fontSize: "font-30" })};
  }
`;

export const StyledCarContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 28px;

  width: 100%;
`;

export const StyledLeftCard = styled(Card)`
  flex: 1;
  height: fit-content;
  .ant-card-body {
    // override default ant design styles
    padding: 0 !important;
  }
`;

export const StyledRightCard = styled(Card)`
  flex: 3;
  height: fit-content;
  .ant-typography {
    ${mixins.textMixin({ $color: "darkBlue", $fontSize: "font-18", $fontWeight: 700 })};
    margin-bottom: 20px;
  }
`;

export const StyledInputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
  gap: 1rem;
`;

export const StyledAddColorButton = styled.button<{ $disabled: boolean }>`
  display: flex;
  border: ${({ theme }) => theme.colors.menuBorder} 1px solid;
  border-radius: 4px;
  padding: 7px;
  background-color: transparent;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  svg {
    color: ${({ theme, $disabled }) => $disabled && theme.colors.menuBorder};
  }
`;

export const StyledColorsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCarImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;

  img {
    width: 240px;
    height: 110px;
    object-fit: contain;
  }
`;

export const StyledCarText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const StyledCarModelText = styled.h3`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 220px;
  ${mixins.textMixin({ $color: "darkBlue", $fontSize: "font-24", $fontWeight: 500 })};
`;

export const StyledCarCategoryText = styled.span`
  ${mixins.textMixin({ $color: "lightBlue", $fontSize: "font-16", $fontWeight: 500 })};
`;

export const StyledUpload = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledUploadDescription = styled.span`
  padding: 8px 10px;
  border-width: 1px 0 1px 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  border-style: solid;
  border-radius: 4px 0 0 4px;

  width: 170px;
`;

export const StyledUploadButton = styled(Upload)`
  background-color: ${({ theme }) => theme.colors.uploadButton};
  border-radius: 0 4px 4px 0;
  border-width: 1px 1px 1px 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  border-style: solid;
  padding: 8px 10px;
  cursor: pointer;
  text-align: center;
  width: 80px;
  &:hover {
    transition: background-color 0.1s linear;
    background-color: ${({ theme }) => theme.colors.lighterGray};
  }

  ${mixins.textMixin({ $color: "black" })};
`;

export const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 22px;
  ${mixins.textMixin({ $color: "gray", $fontWeight: 400 })};

  border-top: 1px solid ${({ theme }) => theme.colors.menuBorder};
  border-bottom: 1px solid ${({ theme }) => theme.colors.menuBorder};

  .ant-progress-text {
    ${mixins.textMixin({ $color: "gray", $fontWeight: 400 })};

    position: absolute;
    bottom: 25px;
    right: 0;
  }
`;

export const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;

  ${mixins.textMixin({ $color: "gray", $fontWeight: 500 })};
`;

export const StyledColorsCheckboxesContainer = styled(Checkbox.Group)`
  display: inline-flex;
  flex-direction: column;
`;

export const StyledFormButtons = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    gap: 15px;
  }
`;
