import { css } from "styled-components";

import { type theme } from "@/styles/theme";

export interface TextMixinProps {
  $fontWeight?: 300 | 400 | 500 | 700;
  $color?: keyof typeof theme.colors;
  $fontSize?: keyof typeof theme.fontSizes;
}

export default {
  textMixin: ({ $fontWeight, $fontSize, $color }: TextMixinProps) => css`
    font-size: ${({ theme }) => theme.fontSizes[$fontSize ?? "font-14"]};
    font-weight: ${$fontWeight};
    color: ${({ theme }) => theme.colors[$color ?? "black"]};
  `,
};
