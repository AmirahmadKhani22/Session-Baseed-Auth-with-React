import {useEffect , type ReactNode} from "react"
import useAuthStore from "@/stores/auth"
import {Outlet , useNavigate} from "react-router"

type Props = {
  children?: ReactNode;
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
        <>
            {children ?? <Outlet />}
        </>
    )
}

export default AuthLayout
