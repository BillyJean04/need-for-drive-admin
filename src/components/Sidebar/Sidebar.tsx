import { useContext } from "react";
import { Link } from "react-router-dom";

import DashboardLogo from "@/assets/dashboardLogo.svg";
import { Menu } from "@/components";
import { MenuTriggerContext } from "@/providers/MenuTriggerProvider";
import { routesPaths } from "@/utils/consts/routes";

import { StyledLogoContainer, StyledSidebar } from "./Sidebar.styled";

export function Sidebar() {
  const { collapsed, setCollapsed } = useContext(MenuTriggerContext);

  return (
    <StyledSidebar
      className="ant-layout-sider-light"
      breakpoint="lg"
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      collapsedWidth="0"
      width={275}
      $isCollapsed={collapsed}
      trigger={null}
      collapsed={collapsed}
      collapsible
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
