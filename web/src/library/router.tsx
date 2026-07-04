import { createBrowserRouter, Navigate } from "react-router";
import {
  About,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  ProfileSettings,
  SignUp,
} from "../pages";
import AuthenticatedLayout from "../component/DefaultLayout";
import { DefaultLayout, Error } from "../component";

export const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: Error,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        Component: AuthenticatedLayout,
        children: [
          {
            path: "home",
            Component: Home,
          },
          {
            path: "profile-settings",
            Component: ProfileSettings,
          },
          {
            path: "about",
            Component: About,
          },
        ],
      },
      {
        Component: DefaultLayout,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "sign-up",
            Component: SignUp,
          },
          {
            path: "forgot-password",
            Component: ForgotPassword,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
