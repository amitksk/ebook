import useTokenStore from "@/store"
import { Navigate, Outlet } from "react-router-dom"

function AuthLayout() {

  const accessToken = useTokenStore((state) => state.accessToken);

  // Check if accessToken exists 
  if (accessToken) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <>
     <Outlet/>
    </>
  )
}

export default AuthLayout

