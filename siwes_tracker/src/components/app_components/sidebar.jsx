import {
  BookOpen,
  Home,
  Calendar,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const navigationItems = [
    { icon: <Home />, label: "Home" },
    { icon: <BookOpen />, label: "Logbook" },
    { icon: <FileText />, label: "Reports" },
    { icon: <Calendar />, label: "Attendance" },
    { icon: <Settings />, label: "Settings" },
  ];

  
  return (
    <>
      <div className="w-64 h-screen bg-white flex flex-col p-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 py-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">LOGVUE</h1>
          </div>
          <p className="text-sm text-gray-600 mb-1">Student Portal</p>
        </div>
        <hr />
        <div className="flex flex-col gap-2 mt-4 h-120">
          {navigationItems.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={`/user/${item.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 h-11 px-3 rounded-lg cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-blue-50 text-blue-800 border-l-4 border-blue-800"
                  : "bg-white text-slate-700 border-l-4 border-transparent"}
                hover:bg-blue-50 hover:text-slate-700`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            );
          })}
        </div>
        <div className="flex items-center gap-2 h-11 px-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer">
          <LogOut /> Logout
        </div>
      </div>
    </>
  );
}

export default Sidebar;
