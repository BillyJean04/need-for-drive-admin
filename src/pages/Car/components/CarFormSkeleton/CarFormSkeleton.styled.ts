import { Skeleton } from "antd";
import styled from "styled-components";

export const StyledInputSkeleton = styled(Skeleton.Input)`
  // override default ant design styles
  width: 100% !important;
  height: 30px !important;
`;
