import { Typography } from "antd";

import { StyledFooter } from "@/components/Footer/Footer.styled";

export function Footer() {
  return (
    <StyledFooter>
      <Typography.Link target="_blank" href="https://billyjean04.github.io/need-for-drive/">
        Главная страница
      </Typography.Link>
      <span>Copyright ©{new Date().getFullYear()} Simbirsoft</span>
    </StyledFooter>
  );
}
