import {memo , useContext , type ReactNode} from "react"
import {DashboardLayoutContext} from "@/contexts/dashboard/layout"

type Props = {
  children: ReactNode
}

function Main({children}: Props) {
  const {menuWidth , isMenuOpened} = useContext(DashboardLayoutContext)!

  return (
    <main 
      className="flex-1 overflow-hidden" 
      style={{paddingLeft: isMenuOpened ? menuWidth : 0}}
    >
      <div className="h-full overflow-auto px-4 py-4">
        {children}
      </div>
    </main>
  )
}

export default memo(Main)