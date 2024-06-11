import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import { Footer, Header, Sidebar } from "@/components";
import { useAuthGuard } from "@/hooks";
import { AlertProvider } from "@/providers/AlertProvider";
import { MenuTriggerProvider } from "@/providers/MenuTriggerProvider";

import { StyledLayout, StyledLayoutContent } from "./MainLayout.styled";

export function MainLayout() {
  const { pathname } = useLocation();

  useAuthGuard();

  return (
    <MenuTriggerProvider>
      <StyledLayout>
        <Sidebar />
        <Layout>
          <Header />
          <AlertProvider>
            <StyledLayoutContent $isDashboard={pathname === "/dashboard"}>
              <Outlet />
              <Footer />
            </StyledLayoutContent>
          </AlertProvider>
        </Layout>
      </StyledLayout>
    </MenuTriggerProvider>
  );
}
