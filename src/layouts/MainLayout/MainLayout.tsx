import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Layout } from "antd";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";

import { Footer, Header, Sidebar } from "@/components";
import { useAuthGuard } from "@/hooks";
import { Error } from "@/pages";
import { AlertProvider } from "@/providers/AlertProvider";
import { MenuTriggerProvider } from "@/providers/MenuTriggerProvider";

import { StyledLayout, StyledLayoutContent } from "./MainLayout.styled";

export function MainLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();

  useAuthGuard();

  return (
    <MenuTriggerProvider>
      <StyledLayout>
        <Sidebar />
        <Layout>
          <Header />
          <AlertProvider>
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <StyledLayoutContent $isDashboard={pathname === "/dashboard"}>
                  <ErrorBoundary FallbackComponent={Error} onReset={reset}>
                    {children}
                    <Outlet />
                  </ErrorBoundary>
                  <Footer />
                </StyledLayoutContent>
              )}
            </QueryErrorResetBoundary>
          </AlertProvider>
        </Layout>
      </StyledLayout>
    </MenuTriggerProvider>
  );
}
