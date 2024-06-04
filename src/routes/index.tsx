import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layouts";
import { Order, Orders, SignIn, SignUp } from "@/pages";
import { routesPaths } from "@/utils/consts/routes";

const { signIn, signUp, dashboard, orders, order } = routesPaths;

export const router = createBrowserRouter([
  {
    path: signIn,
    element: <SignIn />,
  },
  {
    path: signUp,
    element: <SignUp />,
  },
  {
    path: dashboard,
    element: <MainLayout />,
    children: [
      { path: orders, element: <Orders /> },
      { path: order, element: <Order /> },
    ],
  },
]);
