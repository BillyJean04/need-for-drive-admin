import { GoPackage } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

import { routesPaths } from "@/utils/consts/routes";

const { orders, dashboard } = routesPaths;

export const menuItems = [
  {
    key: "/dashboard",
    label: <Link to={dashboard}>Главная</Link>,
    icon: <MdOutlineSpaceDashboard />,
  },
  { key: "/orders", label: <Link to={orders}>Заказы</Link>, icon: <GoPackage /> },
];
