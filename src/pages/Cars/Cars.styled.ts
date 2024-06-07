import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledCarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 27px;

  @media (max-width: ${({ theme }) => theme.device.mobileM}) {
    padding: 0 10px;
  }

  .ant-typography {
    ${mixins.textMixin({ $color: "darkBlue", $fontSize: "font-30" })};
  }
`;

export const StyledCarsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
