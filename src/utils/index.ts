import Cookies from "js-cookie";

export const getHeaders = (token?: string, tokenType?: "Basic" | "Bearer") => ({
  "Content-Type": "application/json",
  "X-Api-Factory-Application-Id": process.env.APPLICATION_ID ?? "",
  Authorization: `${tokenType} ${token}`,
});

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const setCookies = (accessToken: string, refreshToken: string, basicToken?: string) => {
  Cookies.set("access", accessToken);
  Cookies.set("refresh", refreshToken);

  if (basicToken) {
    Cookies.set("basic", basicToken);
  }
};

export const removeCookies = () => {
  Cookies.remove("access");
  Cookies.remove("basic");
  Cookies.remove("refresh");
};
