import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { Footer, Header, Sidebar } from "@/components";
import { useAuthGuard } from "@/hooks";

import { StyledLayout, StyledLayoutContent } from "./MainLayout.styled";

export function MainLayout() {
  useAuthGuard();

  return (
    <StyledLayout>
      <Sidebar />
      <Layout>
        <Header />
        <StyledLayoutContent>
          <Outlet />
        </StyledLayoutContent>
        <Footer />
      </Layout>
    </StyledLayout>
  );
}
