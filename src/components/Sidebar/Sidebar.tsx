import { Link } from "react-router-dom";

import DashboardLogo from "@/assets/dashboardLogo.svg";
import { Menu } from "@/components";
import { routesPaths } from "@/utils/consts/routes";

import { StyledLogoContainer, StyledSidebar } from "./Sidebar.styled";

export function Sidebar() {
  return (
    <StyledSidebar
      className="ant-layout-sider-light"
      breakpoint="lg"
      collapsedWidth="0"
      width={275}
    >
      <StyledLogoContainer>
        <Link to={routesPaths.dashboard}>
          <DashboardLogo width={117} height={21} />
        </Link>
      </StyledLogoContainer>
      <Menu />
    </StyledSidebar>
  );
}
