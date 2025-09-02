
import Sidebar from "../components/app_components/sidebar"
import DashboardContent from "../components/app_components/DashboardContent";
function UserPage(){
    
    return <>
    <div className="flex h-screen bg-slate-50">
    <Sidebar />
    <DashboardContent />
    </div>
    
    </>
}

export default UserPage;