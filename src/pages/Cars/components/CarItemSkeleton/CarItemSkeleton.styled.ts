import styled from "styled-components";

export const StyledCarItemSkeleton = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.menuBorder};
`;

export const StyledCarItemDescriptionSkeleton = styled.div`
  flex: 1.1;
  min-width: min(15rem, 100%);
`;

export const StyledCarItemColorsSkeleton = styled.div`
  flex: 1;
`;

export const StyledCarItemPricesSkeleton = styled.div`
  flex: 1;
`;

export const StyledCarItemAdditionalInfoSkeleton = styled.div`
  flex: 1;
`;

export const StyledCarItemButtonsSkeleton = styled.div`
  display: flex;
  gap: 25px;

  .ant-skeleton {
    .ant-skeleton-button {
      // override default ant design styles
      width: 95px !important;
    }
  }
`;
