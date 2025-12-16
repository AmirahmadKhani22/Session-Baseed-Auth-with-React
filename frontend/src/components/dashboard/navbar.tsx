import {Link , useNavigate} from "react-router"
import {memo , useContext , useEffect , useRef , useState , type ReactNode} from "react"
import useAuthStore from "@/stores/auth"
import {DashboardLayoutContext} from "@/contexts/dashboard/layout"
import PopupsErrors from "@/components/popups/errors"

type Props = {
    menu: ReactNode
}

function Navbar({menu}: Props) {
    const navigate = useNavigate()
    const {menuWidth , isMenuOpened , setIsMenuOpened} = useContext(DashboardLayoutContext)!
    const ctrl = useRef(new AbortController())
    const [error , setError] = useState<{title: string , message: string} | null>(null)
    useEffect(() => {
        return () => {
            if(!ctrl.current.signal.aborted) {
                ctrl.current.abort()
            }
        }
    } , [])
    const logoutUser = useAuthStore(state => state.logoutUser)

    function onLogout() {
        logoutUser({
            onSuccess() {
                navigate("/")
            },
            onError(error) {
                // handle errors
                if(error.cause.type === "UNAUTHORIZED_ERROR") {
                    navigate("/auth/login")
                    return
                }
                setError({
                    title: error.cause.type,
                    message: error.message
                })
            },
            externalController: ctrl.current
        })
    }

    if(!menu) {
        throw new Error(
            "dashboard menu doesn't exists!",
            {cause: {
                type: "UNEXPECTED_CLIENT_ERROR"
            }}
        )
    }
    function closeMenu() {
        setIsMenuOpened(false)
    }
    function openMenu() {
        setIsMenuOpened(true)
    }

    return (
        <>
            <nav className="relative shrink-0 bg-white px-4 py-2 flex items-center justify-between shadow-lg">
                <div>
                    <button
                        className="text-xl font-bold cursor-pointer"
                        onClick={openMenu}
                    >
                        menu
                    </button>
                </div>
                <div>
                    <button 
                        className="text-xl font-bold cursor-pointer"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
                <aside 
                    className="absolute top-0 left-0 z-30 block h-screen overflow-hidden shadow-md" 
                    style={{
                        width: menuWidth, 
                        transform: `translateX(${isMenuOpened ? 0 : -1 * menuWidth}px)`
                    }}
                >
                    <div className="relative w-full h-screen">
                        <div className="w-full h-screen px-3 py-3 bg-white overflow-y-auto">
                            <button 
                                onClick={closeMenu}
                                className="absolute top-4 right-4 size-8 bg-red-950 rounded-full cursor-pointer"
                            >
                            </button>
                            <Link to={"/"}>
                                Go To Home
                            </Link>
                            {menu}
                        </div>
                    </div>
                </aside>
            </nav>
            {
                !!error && PopupsErrors({
                    title: error.title,
                    message: error.message
                })
            }
        </>
    )
}

export default memo(Navbar)
