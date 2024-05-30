import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { routesPaths } from "@/utils/consts/routes";

export function useProfileDropdown() {
  const auth = useAuth();
  const navigate = useNavigate();

  return [
    {
      label: (
        <button
          className="logout-button"
          type="button"
          onClick={() => auth?.logout().then(() => navigate(routesPaths.signIn))}
        >
          Выход
        </button>
      ),
      key: "1",
    },
  ];
}
