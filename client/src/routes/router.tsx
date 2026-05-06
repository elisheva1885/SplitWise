import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home.page";
import { UserPage } from "../pages/user.page";
import { GroupPage } from "../pages/group.page";
import { Layout } from "../components/layout";
import ProtectedRoutes from "./protected-routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <ProtectedRoutes />,
        children: [

          {
            path: "user",
            element: <UserPage />,
          },
          {
            path: "groups",
            element: <GroupPage />,
          },
        ],
      }
    ]
    }
    ]);
export default router;
