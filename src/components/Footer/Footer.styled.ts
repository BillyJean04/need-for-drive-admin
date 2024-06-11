import { Layout } from "antd";
import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledFooter = styled(Layout.Footer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: auto;

  span {
    ${mixins.textMixin({ $fontWeight: 500, $color: "lightBlue" })};
  }
`;
