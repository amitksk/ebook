import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import "./index.css"
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/register.tsx'
import LoginPage from './pages/Login.tsx'
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
    <App />

    <RouterProvider router={router}/>
      
  </StrictMode>,
)
