import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { removeCookies } from "@/utils";
import { routesPaths } from "@/utils/consts/routes";

export function useAuthGuard() {
  const accessToken = Cookies.get("access");
  const refreshToken = Cookies.get("refresh");
  const navigate = useNavigate();
  const auth = useAuth();
  const { signIn } = routesPaths;

  useEffect(() => {
    if (accessToken) {
      const accessTokenExpTime = jwtDecode(accessToken ?? "").exp;

      if (accessTokenExpTime && accessTokenExpTime * 1000 < Date.now()) {
        navigate(signIn);
      }
    } else {
      removeCookies();
      navigate(signIn);
    }

    if (refreshToken) {
      const refreshTokenExpTime = jwtDecode(refreshToken ?? "").exp;

      if (refreshTokenExpTime && refreshTokenExpTime * 1000 < Date.now()) {
        removeCookies();
        navigate(signIn);
      } else {
        auth?.refresh();
      }
    }
  }, [accessToken, auth, navigate, refreshToken, signIn]);
}
