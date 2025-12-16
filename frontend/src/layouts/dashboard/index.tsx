import {useEffect, type ReactNode} from "react"
import {Outlet , useNavigate} from "react-router"
import useAuthStore from "@/stores/auth"
import ModalLoading from "@/components/loadings/modal"

type Props = {
  children?: ReactNode;
}

function DashboardLayout({children}: Props) {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const isLoggingOutUser = useAuthStore(state => state.isLoggingOutUser)
  useEffect(() => {
    if(!user) {
      navigate("/auth/login")
    }
  } , [])

  return (
    <>
      {children ?? <Outlet />}
      {isLoggingOutUser && <ModalLoading />}
    </>
  )
}

export default DashboardLayout
