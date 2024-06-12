import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import AuthProvider from "@/providers/AuthProvider";
import { router } from "@/routes";
import { theme, themeConfig } from "@/styles/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ConfigProvider theme={themeConfig}>
            <RouterProvider router={router} />
          </ConfigProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
