import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledPointsContainer = styled.div`
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

export const StyledAddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 10px;
`;
