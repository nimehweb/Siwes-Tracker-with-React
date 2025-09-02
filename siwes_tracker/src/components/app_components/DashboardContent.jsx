import { Outlet } from "react-router-dom";

export default function DashboardContent() {

return(
    <>
    <div className="flex-1 overflow-y-auto">
    <Outlet />
    </div>
    
    </>
)
}