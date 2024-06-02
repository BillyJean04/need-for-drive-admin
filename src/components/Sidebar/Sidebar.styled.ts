import { Layout } from "antd";
import styled from "styled-components";

export const StyledSidebar = styled(Layout.Sider)<{ $isCollapsed: boolean }>`
  @media (max-width: ${({ theme }) => theme.device.laptop}) {
    display: ${({ $isCollapsed }) => ($isCollapsed ? "none" : "block")};
    max-height: max-content;

    // override default ant design styles
    position: absolute !important;
    max-width: 100% !important;
    width: 100% !important;
    inset: 64px 0;
    z-index: 100;
  }

  box-shadow: 1px 0 8px 0 rgba(90, 97, 105, 0.25);
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 32px;
  padding-left: 50px;
  margin: 16px 0;

  @media (max-width: ${({ theme }) => theme.device.laptop}) {
    display: none;
  }

  a {
    display: flex;
    align-self: self-start;

    path:first-child {
      fill: ${({ theme }) => theme.colors.darkBlue};
    }
    path:last-child {
      fill: ${({ theme }) => theme.colors.green};
    }
  }
`;
