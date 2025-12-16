import {type ReactNode} from "react"
import useAuthStore from "@/stores/auth"
import Navbar from "@/components/navbar"
import ModalLoading from "@/components/loadings/modal"

type Props = {
  children?: ReactNode;
}

function AuthTemplate({children}: Props) {
    const isLoggingInUser = useAuthStore(state => state.isLoggingInUser)

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
                <div className="min-h-full flex items-center justify-center py-6 px-8">
                    {children}
                </div>
            </div>
            {
                isLoggingInUser && <ModalLoading />
            }
        </div>
    )
}

export default AuthTemplate
