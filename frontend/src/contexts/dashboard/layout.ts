import {createContext , type Dispatch , type SetStateAction} from "react"

export type DashboardLayoutContextValue = {
    menuWidth: number;
    isMenuOpened: boolean;
    setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
}

export const DashboardLayoutContext = createContext<DashboardLayoutContextValue | null>(null)
