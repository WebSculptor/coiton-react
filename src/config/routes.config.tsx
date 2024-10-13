import { layouts } from "@/layouts";
import { views } from "@/views";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    element: layouts.root,
    children: [
      {
        path: "/",
        element: views.home,
      },
      {
        path: "/about",
        element: views.about,
      },
      {
        path: "/token",
        element: views.token,
      },
      {
        path: "/team",
        element: views.team,
      },
      {
        path: "/listings",
        element: views.listings,
      },
      {
        path: "/blog",
        element: views.blog,
      },
    ],
  },
  {
    element: layouts.test,
    children: [
      {
        path: "/starknet-test",
        element: views.test,
      },
    ],
  },
]);
