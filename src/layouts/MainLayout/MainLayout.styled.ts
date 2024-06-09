import { Layout } from "antd";
import styled from "styled-components";

export const StyledLayout = styled(Layout)`
  height: 100dvh;
`;

export const StyledLayoutContent = styled(Layout.Content)<{ $isDashboard: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  position: relative;

  justify-content: ${({ $isDashboard }) => ($isDashboard ? "flex-end" : "space-between")};
`;
