import { Layout } from "antd";
import styled from "styled-components";

export const StyledLayout = styled(Layout)`
  height: 100dvh;
`;

export const StyledLayoutContent = styled(Layout.Content)<{ $isDashboard: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px 0 0;
  overflow-y: auto;

  justify-content: ${({ $isDashboard }) => ($isDashboard ? "flex-end" : "space-between")};
`;
