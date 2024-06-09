import { FaMapMarkerAlt } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { LiaCarSideSolid } from "react-icons/lia";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

import { routesPaths } from "@/utils/consts/routes";

const { orders, dashboard, cars, points } = routesPaths;

export const menuItems = [
  {
    key: "/dashboard",
    label: <Link to={dashboard}>Главная</Link>,
    icon: <MdOutlineSpaceDashboard />,
  },
  { key: "/orders", label: <Link to={orders}>Заказы</Link>, icon: <GoPackage /> },
  { key: "/cars", label: <Link to={cars}>Автомобили</Link>, icon: <LiaCarSideSolid /> },
  { key: "/points", label: <Link to={points}>Пункты выдачи</Link>, icon: <FaMapMarkerAlt /> },
];
