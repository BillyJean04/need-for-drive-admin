import styled from "styled-components";

export const StyledTableFilterControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lighterGray};
  flex-wrap: wrap;
`;

export const StyledSelectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding-bottom: 15px;
  flex-wrap: wrap;

  .ant-select {
    width: 150px;
    height: 30px;

    @media (max-width: ${({ theme }) => theme.device.mobileL}) {
      width: 100%;
    }
  }
`;

export const StyledFilterButtons = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 15px;

  @media (max-width: ${({ theme }) => theme.device.mobileL}) {
    flex-direction: column;
    width: 100%;
  }
`;
