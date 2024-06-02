import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import {
  StyledDropdownButton,
  StyledNotificationCountDropdown,
  StyledNotificationDropdownItem,
} from "@/styles/global.styled";
import { routesPaths } from "@/utils/consts/routes";

export function useProfileDropdown() {
  const auth = useAuth();
  const navigate = useNavigate();

  return [
    {
      label: (
        <StyledNotificationDropdownItem>
          <StyledDropdownButton type="button">
            Уведомления <StyledNotificationCountDropdown>2</StyledNotificationCountDropdown>
          </StyledDropdownButton>
        </StyledNotificationDropdownItem>
      ),
      key: "2",
    },
    {
      label: (
        <StyledDropdownButton
          type="button"
          onClick={() => auth?.logout().then(() => navigate(routesPaths.signIn))}
        >
          Выход
        </StyledDropdownButton>
      ),
      key: "1",
    },
  ];
}
