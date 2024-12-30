import DashboardLayout from "./Layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import CreateBook from "./pages/CreateBook";
import AuthLayout from "./Layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BooksPage from "./pages/BooksPage";
import { createBrowserRouter } from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "books/create",
        element: <CreateBook />,
      },
      {
        path: "books/:bookId",
        element: <BookDetailsPage />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
