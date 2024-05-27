import { message } from "antd";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";
import { createContext, ReactNode, useMemo } from "react";

import { LoginApi } from "@/types/api";
import { getHeaders, removeCookies, setCookies } from "@/utils";
import { Urls } from "@/utils/consts/urls";
import { fetcher } from "@/utils/fetcher";

interface AuthContext {
  login: (data: { username: string; password: string }) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage();

  const providerValues = useMemo(() => {
    const login = async (data: { username: string; password: string }) => {
      const authHash = btoa(`${nanoid()}:${process.env.SECRET}`);

      try {
        await fetcher<LoginApi>({
          endpoint: Urls.login,
          headers: new Headers(getHeaders(authHash, "Basic")),
          body: JSON.stringify({ ...data, username: "intern" }),
          method: "POST",
        })
          .then((res) => {
            setCookies(res.access_token, res.refresh_token, authHash);
          })
          .catch(() => {
            messageApi.open({
              type: "error",
              content: "Неверный логин или пароль",
            });
          });
      } catch (error) {
        throw new Error("Что-то пошло не так");
      }
    };

    const refresh = async () => {
      try {
        const basicToken = Cookies.get("basic");
        const refreshToken = Cookies.get("refresh");

        if (basicToken) {
          await fetcher<LoginApi>({
            endpoint: Urls.refresh,
            method: "POST",
            headers: new Headers(getHeaders(basicToken, "Basic")),
            body: JSON.stringify({ refresh_token: refreshToken }),
          }).then((res) => {
            setCookies(res.access_token, res.refresh_token);
          });
        }
      } catch (error) {
        throw new Error("Что-то пошло не так");
      }
    };

    const logout = async () => {
      try {
        const accessToken = Cookies.get("access");

        await fetcher<LoginApi>({
          endpoint: Urls.logout,
          method: "POST",
          headers: new Headers(getHeaders(accessToken, "Bearer")),
        });
      } catch (error) {
        removeCookies();
      }
    };

    return { login, refresh, logout };
  }, [messageApi]);

  return (
    <AuthContext.Provider value={providerValues}>
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
}
