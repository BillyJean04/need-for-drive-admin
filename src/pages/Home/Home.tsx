import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth, useAuthGuard } from "@/hooks";

export function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  useAuthGuard();

  return (
    <div>
      <Button onClick={() => auth?.logout().then(() => navigate("/"))} type="primary">
        Выйти
      </Button>
    </div>
  );
}
