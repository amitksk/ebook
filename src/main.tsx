import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import DashboardLayout from './Layout/DashboardLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import BookPage from './pages/BooksPage.tsx'
import AuthLayout from './Layout/AuthLayout.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'books',
        element: <BookPage/>,
      }
    ],
  },


  {
    path: '/auth',
    element: <AuthLayout/>,
    children: [
      {
        path: 'login',
        element: <LoginPage/>,
      },
      {
        path: 'register',
        element: <RegisterPage/>,
      },
    ],
  }
  
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <RouterProvider router={router}/>
      
  </StrictMode>,
)
