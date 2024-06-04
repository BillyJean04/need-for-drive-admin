import { baseUrl } from "@/utils/consts/urls";

export interface Options {
  endpoint: string;
  headers: Headers;
  body?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: string;
}

export async function fetcher<T>(options: Options): Promise<T> {
  const { params, headers, body, method, endpoint } = options;

  return fetch(`${baseUrl}${endpoint}${params ? `?${params}` : ""}`, {
    headers,
    body,
    method,
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    return res.json();
  });
}
