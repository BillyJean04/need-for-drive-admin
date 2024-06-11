import { Skeleton } from "antd";

import {
  StyledCarItemAdditionalInfoSkeleton,
  StyledCarItemButtonsSkeleton,
  StyledCarItemColorsSkeleton,
  StyledCarItemDescriptionSkeleton,
  StyledCarItemPricesSkeleton,
  StyledCarItemSkeleton,
} from "./CarItemSkeleton.styled";

export function CarItemSkeleton() {
  return (
    <StyledCarItemSkeleton>
      <Skeleton.Avatar style={{ width: "160px", height: "90px" }} shape="square" />
      <StyledCarItemDescriptionSkeleton>
        <Skeleton title={false} paragraph={{ rows: 2 }} />
      </StyledCarItemDescriptionSkeleton>
      <StyledCarItemColorsSkeleton>
        <Skeleton.Input size="small" />
      </StyledCarItemColorsSkeleton>
      <StyledCarItemPricesSkeleton>
        <Skeleton.Avatar style={{ width: "160px", height: "50px" }} shape="square" />
      </StyledCarItemPricesSkeleton>
      <StyledCarItemAdditionalInfoSkeleton>
        <Skeleton title={false} paragraph={{ rows: 2 }} />
      </StyledCarItemAdditionalInfoSkeleton>
      <StyledCarItemButtonsSkeleton>
        <Skeleton.Button />
        <Skeleton.Button />
      </StyledCarItemButtonsSkeleton>
    </StyledCarItemSkeleton>
  );
}
