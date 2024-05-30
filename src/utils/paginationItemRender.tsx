import { PaginationProps } from "antd";

import PaginationArrowLeft from "@/assets/pagination-arrow-left.svg";
import PaginationArrowRight from "@/assets/pagination-arrow-right.svg";

export const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
  if (type === "prev") {
    return <PaginationArrowLeft />;
  }
  if (type === "next") {
    return <PaginationArrowRight />;
  }
  return originalElement;
};
