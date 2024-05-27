import { baseUrl } from "@/utils/consts/urls";

export interface Options {
  endpoint: string;
  headers: Headers;
  body?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

export async function fetcher<T>(options: Options): Promise<T> {
  return fetch(`${baseUrl}${options.endpoint}`, {
    headers: options.headers,
    body: options.body,
    method: options.method,
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    return res.json();
  });
}
