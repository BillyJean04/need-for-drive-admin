import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { removeCookies } from "@/utils";

export function useAuthGuard() {
  const accessToken = Cookies.get("access");
  const refreshToken = Cookies.get("refresh");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (accessToken) {
      const accessTokenExpTime = jwtDecode(accessToken ?? "").exp;

      if (accessTokenExpTime && accessTokenExpTime * 1000 < Date.now()) {
        navigate("/");
      }
    } else {
      removeCookies();
      navigate("/");
    }

    if (refreshToken) {
      const refreshTokenExpTime = jwtDecode(refreshToken ?? "").exp;

      if (refreshTokenExpTime && refreshTokenExpTime * 1000 < Date.now()) {
        removeCookies();
        navigate("/");
      } else {
        auth?.refresh();
      }
    }
  }, [accessToken, auth, navigate, refreshToken]);
}
