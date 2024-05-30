import { Input } from "antd";
import { RxAvatar } from "react-icons/rx";

import Arrow from "@/assets/arrow-down.svg";
import Bell from "@/assets/bell.svg";
import Search from "@/assets/search.svg";
import { useProfileDropdown } from "@/hooks/useProfileDropdown";

import {
  StyledDropdown,
  StyledHeader,
  StyledInputContainer,
  StyledNotificationContainer,
  StyledNotificationCount,
} from "./Header.styled";

export function Header() {
  const items = useProfileDropdown();

  return (
    <StyledHeader>
      <StyledInputContainer>
        <Search />
        <Input placeholder="Поиск ..." variant="borderless" />
      </StyledInputContainer>
      <StyledNotificationContainer>
        <Bell width={17} height={20} />
        <StyledNotificationCount>2</StyledNotificationCount>
      </StyledNotificationContainer>
      <StyledDropdown menu={{ items }} trigger={["click"]}>
        <div>
          <RxAvatar size="3em" />
          <span>Admin</span>
          <Arrow width={10} height={5} />
        </div>
      </StyledDropdown>
    </StyledHeader>
  );
}
