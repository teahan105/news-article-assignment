import { EditArticle } from "@/ui/updatingArticle";
import { Home } from "@/ui/article";
import { Layout } from "@/ui/layouts";
import { NewArticle } from "@/ui/createArticle";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "new-article",
        element: <NewArticle />,
      },
      {
        path: "edit-article/:id",
        element: <EditArticle />,
      },
    ],
  },
]);
