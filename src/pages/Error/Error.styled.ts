import styled from "styled-components";

import mixins from "@/styles/mixins";

export const StyledError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 14px;
  height: 100dvh;

  h1 {
    ${mixins.textMixin({ $color: "lightBlue", $fontWeight: 500, $fontSize: "font-70" })};
  }

  h2 {
    ${mixins.textMixin({ $color: "darkBlue", $fontWeight: 400, $fontSize: "font-50" })};
  }

  p {
    ${mixins.textMixin({ $color: "gray", $fontWeight: 400, $fontSize: "font-22" })};
  }

  .ant-btn {
    margin-top: 20px;
    width: 95px;
  }
`;
