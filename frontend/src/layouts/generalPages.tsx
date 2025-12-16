import type {ReactNode} from "react"
import {Outlet} from "react-router"
import Navbar from "@/components/navbar"

type Props = {
  children?: ReactNode;
}

function GeneralPagesLayout({children}: Props) {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col relative">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center py-6 px-8">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  )
}

export default GeneralPagesLayout