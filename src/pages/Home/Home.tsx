import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth, useAuthGuard } from "@/hooks";
import { routesPaths } from "@/utils/consts/routes";

export function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  useAuthGuard();

  return (
    <div>
      <Button
        onClick={() => auth?.logout().then(() => navigate(routesPaths.signIn))}
        type="primary"
      >
        Выйти
      </Button>
    </div>
  );
}
