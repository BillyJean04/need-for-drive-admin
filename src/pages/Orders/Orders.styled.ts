import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledOrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 27px;

  @media (max-width: ${({ theme }) => theme.device.mobileM}) {
    padding: 0 10px;
  }
  .ant-typography {
    ${mixins.textMixin({ $color: "darkBlue", $fontSize: "font-30" })};
  }

  .ant-table-content {
    overflow-y: scroll;
  }

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

  .ant-pagination {
    display: flex;
    justify-content: center;

    // override default ant design styles
    margin-top: 30px !important;
    margin-bottom: 0 !important;
  }
`;

export const StyledOrdersItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledEmptyData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;
