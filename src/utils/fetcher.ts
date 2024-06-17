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
  const response = await fetch(`${baseUrl}${endpoint}${params ? `?${params}` : ""}`, {
    headers,
    body,
    method,
  });
  const isContentTypeJson = response.headers.get("content-type")?.includes("application/json");

  const responseData = isContentTypeJson
    ? await response.json()
    : { status: response.status, statusText: response.statusText };

  if (!response.ok) {
    return Promise.reject(responseData);
  }

  return Promise.resolve(responseData);
}
