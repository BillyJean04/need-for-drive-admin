import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layouts";
import { Cars, Error, Orders, Points, SignIn, SignUp } from "@/pages";
import { routesPaths } from "@/utils/consts/routes";

const { signIn, signUp, dashboard, orders, cars, points } = routesPaths;

export const router = createBrowserRouter([
  {
    errorElement: (
      <MainLayout>
        <Error />
      </MainLayout>
    ),
    children: [
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
          { path: cars, element: <Cars /> },
          { path: points, element: <Points /> },
        ],
      },
    ],
  },
]);
