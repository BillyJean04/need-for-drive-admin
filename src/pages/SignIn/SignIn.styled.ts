import { Button, Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

export const StyledSignInContainer = styled(Flex)`
  max-width: 376px;
  margin: 175px auto;

  .ant-card-body {
    box-shadow:
      0 1px 0 rgba(90, 97, 105, 0.11),
      0 2px 4px rgba(90, 97, 105, 0.12),
      0 5px 5px rgba(90, 97, 105, 0.06),
      0 3.5px 35px rgba(90, 97, 105, 0.1);
    border-radius: 8px 8px 8px 8px;
    padding: 20px;
  }

  .ant-form-item {
    margin-bottom: 15px;
  }
`;

export const StyledCard = styled(Card)`
  width: 100%;
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 400;
`;

export const StyledButton = styled(Button)`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0 40px;
  align-items: center;
  border-radius: 4px;
  box-shadow: none;
  height: 35px;
`;
