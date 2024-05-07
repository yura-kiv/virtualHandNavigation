import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../components/MainLayout/MainLayout";
import CardDetail from "../pages/сardDetail/CardDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/cards",
        element: <Home />,
      },
      {
        path: "/cards/:id",
        element: <CardDetail />,
      },
      {
        path: "/",
        element: <Navigate to={"/cards"} />,
      },
    ],
  },
]);
