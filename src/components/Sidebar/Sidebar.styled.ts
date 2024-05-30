import { Layout } from "antd";
import styled from "styled-components";

export const StyledSidebar = styled(Layout.Sider)`
  @media (max-width: ${({ theme }) => theme.device.laptop}) {
    // override default ant design sider styles
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
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

  a {
    display: flex;
    align-self: self-start;

    path:first-child {
      fill: #3d5170;
    }
    path:last-child {
      fill: #0ec261;
    }
  }
`;
