import { useLocation } from "react-router-dom";

import { StyledMenu } from "./Menu.styled";
import { menuItems } from "./menuItems";

export function Menu() {
  const location = useLocation();
  const selectedMenuItem = `/${location.pathname.split("/")[2]}`;

  return <StyledMenu selectedKeys={[selectedMenuItem]} items={menuItems} />;
}
