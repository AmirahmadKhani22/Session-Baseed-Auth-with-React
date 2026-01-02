import {useEffect , type ReactNode} from "react"
import useAuthStore from "@/stores/auth"
import {Outlet , useNavigate} from "react-router"
import AuthLayoutErrorBoundary from "./errorBoundary"

type Props = {
  children?: ReactNode;
}

function ErrorBoundaryFallback() {
  return (
    <h1 className='text-indigo-950 text-3xl text-center font-bold'>
      There is a problem to process user's data!
      <br />
      Please, call it to the support team.
    </h1>
  )
}

function AuthLayout({children}: Props) {
    const navigate = useNavigate()
    const user = useAuthStore(state => state.user)
    useEffect(() => {
        if(user) {
            navigate("/")
        }
    } , [])

    return (
        <AuthLayoutErrorBoundary fallback={ErrorBoundaryFallback}>
            {children ?? <Outlet />}
        </AuthLayoutErrorBoundary>
    )
}

export default AuthLayout
