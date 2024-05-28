import { createBrowserRouter } from "react-router-dom";

import { Home, SignIn, SignUp } from "@/pages";
import { routesPaths } from "@/utils/consts/routes";

const { signIn, signUp, home } = routesPaths;

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
    path: home,
    element: <Home />,
  },
]);
