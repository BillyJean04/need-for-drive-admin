import { useLocation } from "react-router-dom";

import { StyledMenu } from "./Menu.styled";
import { menuItems } from "./menuItems";

export function Menu() {
  const location = useLocation();
  const selectedMenuItem = `/${location.pathname.split("/")[2]}`;
  const isDashboard = location.pathname === "/dashboard";

  return (
    <StyledMenu selectedKeys={[isDashboard ? "/dashboard" : selectedMenuItem]} items={menuItems} />
  );
}
