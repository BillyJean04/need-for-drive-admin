import { Skeleton } from "antd";
import styled from "styled-components";

export const StyledOrderItemSkeleton = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.menuBorder};
`;

export const StyledOrderInfoSkeleton = styled.div`
  flex: 1.1;
  min-width: min(15rem, 100%);

  .ant-skeleton-paragraph {
    li {
      // override default ant design styles
      margin-block-start: 9px !important;
    }
    li:first-child {
      // override default ant design styles
      margin-block-start: 0 !important;
    }
  }
`;

export const StyledOrderItemSkeletonImage = styled(Skeleton.Image)`
  flex: 1;
`;

export const StyledCheckboxSkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  span {
    // override default ant design styles
    height: 22px !important;
  }
  @media (min-width: ${({ theme }) => theme.device.laptopM}) {
    flex: 1;
  }
`;

export const StyledRadioButtonGroupSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.device.laptopM}) {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.device.mobileL}) {
    flex-direction: column;
    align-items: stretch;
    flex: 0;
  }
`;
