import { Pagination } from "antd";
import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledDropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 0;
  background: none;
  text-align: start;
  font-weight: 500;
`;

export const StyledNotificationDropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.device.mobileM}) {
    display: none;
  }
`;

export const StyledNotificationCountDropdown = styled.span`
  background-color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  padding: 5px;
  color: ${({ theme }) => theme.colors.white};
  top: 33px;
  right: 18px;
  font-weight: 700;
  font-size: 9px;
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  // override default ant design styles
  margin-top: 30px !important;
  margin-bottom: 0 !important;
  justify-content: center;
  .ant-pagination-item {
    ${mixins.textMixin({ $fontWeight: 700 })};

    border-radius: 50px;

    a {
      color: ${({ theme }) => theme.colors.blue};
    }
  }

  .ant-pagination-item-active {
    background-color: ${({ theme }) => theme.colors.blue};
    border-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};

    a {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .ant-pagination-item-ellipsis {
    // override default ant design styles
    color: ${({ theme }) => theme.colors.blue} !important;
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    display: flex;
    align-items: center;
    margin: 0;
    color: ${({ theme }) => theme.colors.blue};
    padding: 0 10px;
  }
  .ant-pagination-next {
    justify-content: flex-start;
  }
  .ant-pagination-prev {
    justify-content: flex-end;
  }
`;
