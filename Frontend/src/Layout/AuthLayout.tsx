import useTokenStore from "@/store"
import { Navigate, Outlet } from "react-router-dom"

function AuthLayout() {


  const token = useTokenStore((state)=> state.token)
  if(token){
    return <Navigate to={"/"} replace/>
  }


  return (
    <>
     <Outlet/>
    </>
  )
}

export default AuthLayout