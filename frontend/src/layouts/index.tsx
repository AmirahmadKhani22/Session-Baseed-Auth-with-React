import useAuthStore from "@/stores/auth"
import {useEffect , useRef , type ReactNode} from "react"
import {Outlet} from "react-router"

type Props = {
  children?: ReactNode;
}

function RootLayout({children}: Props) {
  const userAuthStatus = useAuthStore(state => state.status)
  const isGettingUser = useAuthStore(state => state.isGettingUser)
  const getUser = useAuthStore(state => state.getUser)
  const ctrl = useRef(new AbortController())
  useEffect(() => {
    let getUserTimeoutId!: number
    if(userAuthStatus === "none") {
      getUser({externalController: ctrl.current})
      getUserTimeoutId = setTimeout(() => {
        ctrl.current.abort()
      } , 1000)
    }
    return () => {
      if(getUserTimeoutId) {
        clearTimeout(getUserTimeoutId)
      }
    }
  } , [])

  if(isGettingUser) return

  return (
    <>
      {children ?? <Outlet />}
    </>
  )
}

export default RootLayout
