import { createBrowserRouter } from "react-router";
import { Home } from "../pages";
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
    ],
  },
]);
