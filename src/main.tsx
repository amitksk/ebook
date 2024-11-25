import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import Homepage from './pages/Home.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
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
