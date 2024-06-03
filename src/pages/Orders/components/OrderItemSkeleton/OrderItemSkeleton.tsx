import { Skeleton } from "antd";

import {
  StyledCheckboxSkeletonContainer,
  StyledOrderInfoSkeleton,
  StyledOrderItemSkeleton,
  StyledRadioButtonGroupSkeleton,
} from "./OrderItemSkeleton.styled";

export function OrderItemSkeleton() {
  return (
    <StyledOrderItemSkeleton>
      <Skeleton.Avatar style={{ width: "160px", height: "90px" }} shape="square" />
      <StyledOrderInfoSkeleton>
        <Skeleton title={false} paragraph={{ rows: 3 }} />
      </StyledOrderInfoSkeleton>
      <StyledCheckboxSkeletonContainer>
        <Skeleton.Input size="small" />
        <Skeleton.Input size="small" />
        <Skeleton.Input size="small" />
      </StyledCheckboxSkeletonContainer>
      <Skeleton.Input size="small" />
      <StyledRadioButtonGroupSkeleton>
        <Skeleton.Button />
        <Skeleton.Button />
        <Skeleton.Button />
      </StyledRadioButtonGroupSkeleton>
    </StyledOrderItemSkeleton>
  );
}
