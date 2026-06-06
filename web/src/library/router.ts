import { createBrowserRouter } from "react-router";
import { Home, Login, NotFound, SignUp } from "../pages";
import { Layout } from "../component";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "sign-up",
        Component: SignUp,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
