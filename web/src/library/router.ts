import { createBrowserRouter } from "react-router";
import { Home, Login, NotFound, ProfileSettings, SignUp } from "../pages";
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
      {
        path: "profile-settings",
        Component: ProfileSettings,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
