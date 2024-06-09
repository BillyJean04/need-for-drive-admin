import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledOrdersContainer = styled.div`
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
