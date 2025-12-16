import useAuthStore from "@/stores/auth"
import {useState , type ReactNode} from "react"
import {DashboardLayoutContext} from "@/contexts/dashboard/layout"
import Navbar from "@/components/dashboard/navbar"
import AdminMenu from "./admin/menu"
import BuyerMenu from "./buyer/menu"
import SellerMenu from "./seller/menu"
import Main from "@/components/dashboard/main"
import ModalLoading from "@/components/loadings/modal"

type Props = {
  children?: ReactNode;
}

function DashboardTemplate({children}: Props) {
    const user = useAuthStore(state => state.user)!
    const isLoggingOutUser = useAuthStore(state => state.isLoggingOutUser)
    const [isMenuOpened , setIsMenuOpened] = useState(true)

    const contextValue = {
        menuWidth: 220,
        isMenuOpened,
        setIsMenuOpened
    }
    
    return (
        <DashboardLayoutContext.Provider value={contextValue}>
            <div className="w-full h-screen overflow-hidden flex flex-col relative">
                <Navbar 
                    menu={<>
                        {
                            (user.role === "ADMIN") && (
                                <AdminMenu />
                            ) 
                        }
                        {
                            (user.role === "BUYER") && (
                                <BuyerMenu />
                            ) 
                        }
                        {
                            (user.role === "SELLER") && (
                                <SellerMenu />
                            ) 
                        }
                    </>}
                />
                <Main>
                    {children}
                </Main>
            </div>
            {isLoggingOutUser && <ModalLoading />}
        </DashboardLayoutContext.Provider>
    )
}

export default DashboardTemplate
