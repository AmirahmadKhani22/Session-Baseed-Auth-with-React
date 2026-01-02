import {useEffect, type ReactNode} from "react"
import {Outlet , useNavigate} from "react-router"
import useAuthStore from "@/stores/auth"
import DashboardLayoutErrorBoundary from "./errorBoundary"
import ModalLoading from "@/components/loadings/modal"

type Props = {
  children?: ReactNode;
}

function ErrorBoundaryFallback() {
  return (
    <h1 className='text-indigo-950 text-3xl text-center font-bold'>
      There is a problem to process user's data!
      <br />
      Please, try later.
    </h1>
  )
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
    <DashboardLayoutErrorBoundary fallback={ErrorBoundaryFallback}>
      {children ?? <Outlet />}
      {isLoggingOutUser && <ModalLoading />}
    </DashboardLayoutErrorBoundary>
  )
}

export default DashboardLayout
