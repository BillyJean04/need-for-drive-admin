import styled from "styled-components";

export const StyledDropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 0;
  background: none;
  text-align: start;
  font-weight: 500;
`;

export const StyledNotificationDropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.device.mobileM}) {
    display: none;
  }
`;

export const StyledNotificationCountDropdown = styled.span`
  background-color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  padding: 5px;
  color: ${({ theme }) => theme.colors.white};
  top: 33px;
  right: 18px;
  font-weight: 700;
  font-size: 9px;
`;
