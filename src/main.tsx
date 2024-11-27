import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import DashboardLayout from './pages/DashboardLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import BookPage from './pages/BooksPage.tsx'


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
    path: '/register',
    element: <RegisterPage/>,
  },
  {
    path: '/login',
    element: <LoginPage/>,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <RouterProvider router={router}/>
      
  </StrictMode>,
)
