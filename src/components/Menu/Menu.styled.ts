import { Menu } from "antd";
import styled from "styled-components";

export const StyledMenu = styled(Menu)`
  margin: 0;

  .ant-menu-item {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    border-radius: 0;
    margin-inline: 0;
    border-bottom: 2px solid #e1e5eb;
    height: 57px;
    border-left: 4px solid transparent;
    font-weight: 400;
    padding-inline: 25px;
  }

  li:first-child {
    border-top: 2px solid #e1e5eb;
  }

  .ant-menu-item-selected {
    border-left: 4px solid ${({ theme }) => theme.colors.blue};
    background-color: #fbfbfb;
    color: ${({ theme }) => theme.colors.blue};
  }
`;
