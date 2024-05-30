import { Dropdown, Layout } from "antd";
import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledHeader = styled(Layout.Header)`
  display: flex;
  box-shadow: 0 1px 8px 0 rgba(90, 97, 105, 0.25);

  gap: 25px;

  .ant-layout-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 0 28px;
    width: 100%;
  }
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.lightGray};

  .ant-input {
    color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

export const StyledNotificationContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-left: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 0 26px;
  position: relative;
  cursor: pointer;
`;

export const StyledDropdown = styled(Dropdown)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 14px;

  span {
    ${mixins.textMixin({ $color: "darkBlue", $fontWeight: 500, $fontSize: "font-15" })};
    margin-right: 26px;

    @media (max-width: ${({ theme }) => theme.device.mobileM}) {
      display: none;
    }
  }

  svg:last-child {
    @media (max-width: ${({ theme }) => theme.device.mobileM}) {
      display: none;
    }
  }
`;

export const StyledNotificationCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.red};
  width: 14px;
  height: 14px;
  border-radius: 10px;
  padding: 5px;
  position: absolute;
  color: ${({ theme }) => theme.colors.white};
  top: 33px;
  right: 18px;
  font-weight: 700;
  font-size: 9px;
`;
