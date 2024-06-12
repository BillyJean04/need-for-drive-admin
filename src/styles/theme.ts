import { ThemeConfig } from "antd";

export const theme = {
  fontSizes: {
    "font-13": "13px",
    "font-14": "14px",
    "font-15": "15px",
    "font-16": "16px",
    "font-18": "18px",
    "font-22": "22px",
    "font-24": "24px",
    "font-30": "30px",
    "font-32": "32px",
    "font-40": "40px",
    "font-50": "50px",
    "font-70": "70px",
  },

  colors: {
    blue: "#007BFF",
    darkBlue: "#3D5170",
    lightBlue: "#767F9D",
    lighterGray: "#f0f0f0",
    lightGray: "#CACEDB",
    menuBorder: "#e1e5eb",
    menuItemBg: "#fbfbfb",
    gray: "#999999",
    red: "#C4183C",
    green: "#17C671",
    white: "#fff",
    black: "#121212",
  },

  device: {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "992px",
    laptopM: "1200px",
    laptopL: "1440px",
    desktop: "2560px",
  },
};

export const themeConfig: ThemeConfig = {
  components: {
    Layout: {
      siderBg: theme.colors.white,
      headerBg: theme.colors.white,
      footerBg: theme.colors.white,
    },
    Button: {
      defaultShadow: "",
      primaryShadow: "",
    },
    Alert: {
      defaultPadding: 15,
    },
  },
};
