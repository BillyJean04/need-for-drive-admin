import Cookies from "js-cookie";

import { CarField } from "@/types";

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

export function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function createRenderArray(length: number) {
  return new Array(length).fill(1).map((_, i) => i + 1);
}

export function calculatePageData<T>({
  data,
  page,
  pageLimit,
}: {
  data: T[];
  page: number;
  pageLimit: number;
}): T[] {
  if (data.length > pageLimit) {
    return data?.slice((page - 1) * pageLimit, page * pageLimit);
  }

  return data;
}

export function transformCarData(carData: CarField, categoryId?: number) {
  return {
    name: carData.model,
    categoryId: {
      id: categoryId ?? 0,
    },
    priceMin: carData.priceMin,
    priceMax: carData.priceMax,
    colors: carData.colors,
    number: carData.number,
    tank: Number(carData.tank),
    description: carData.description ?? "",
    thumbnail: {
      path: carData.image,
    },
  };
}
