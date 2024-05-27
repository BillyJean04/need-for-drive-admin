import { createBrowserRouter } from "react-router-dom";

import { Home, SignIn, SignUp } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
