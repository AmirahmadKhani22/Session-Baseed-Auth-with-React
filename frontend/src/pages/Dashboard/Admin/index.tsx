import DashboardTemplate from "@/layouts/dashboard/template"
import {memo} from "react"

function AdminHome() {
  return (
    <DashboardTemplate>
      <h1>Admin</h1>
    </DashboardTemplate>
  )
}

export default memo(AdminHome)
