import { GoPackage } from "react-icons/go";
import { Link } from "react-router-dom";

import { routesPaths } from "@/utils/consts/routes";

const { orders } = routesPaths;

export const menuItems = [
  { key: "/orders", label: <Link to={orders}>Заказы</Link>, icon: <GoPackage /> },
];
