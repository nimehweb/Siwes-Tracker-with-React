import useLogbookStore from "../../stores/logbookStore";
import { BookOpen, Calendar, FileText, TrendingUp } from "lucide-react"
import TodoList from "./Dashboard_components/TodoList";
import { Link } from "react-router-dom";
import CustomCalendar from "../ui/customCalender";
import useAttendanceStore from "../../stores/attendanceStore";
import { auth,db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home(){
   const { entries } = useLogbookStore();
   const { attendanceData } = useAttendanceStore();

   const [user, setUser] = useState(null);
   const fetchUserData = async () => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data());
        }
      }
    });
  };

  useEffect(()=>{
    fetchUserData()
  },[])
  return(
    <>
    <div className="p-10 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="">
          <h1 className="text-3xl font-bold">{`Welcome back ${user ? user.fullName : ""}`}</h1>
          <p className="text-gray-600">Here is your training overview</p>
        </div>
        <button className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-lg px-4 py-2 hover:from-blue-700 hover:to-teal-700 transition duration-300 ease-in-out">
          + Quick Add Entry
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <DashboardCards title="Total Logbook Entries" value={entries.length} icon={<BookOpen />}  color ='blue' />
        <DashboardCards title="Attendance Rate" value="92%" icon={<Calendar />} color ='green' />
        <DashboardCards title="Reports Submitted" value="3" icon={<FileText />} color = 'purple' />
        <DashboardCards title="Days Completed" value="24" icon={<TrendingUp />}  color = 'teal'/>
      </div>
      
      <div className="mt-5 flex gap-4 h-100">
        <div className="bg-white rounded-lg shadow-md p-6 w-2/3 h-105 ">
          <div className="flex items-center mb-2 gap-2"><BookOpen className="text-blue-500"/> <span className="font-bold text-xl">Recent Logbook Entries</span></div>
          <div className="flex flex-col justify-between ">
            <ul className="h-80 overflow-y-auto">
            {entries.slice(-5).map((entry, index) => (
              <li key={index} className="py-2">
                <div className=" rounded-lg p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors duration-300">
                  <span className="font-bold">{entry.title}</span>
                  <p className="text-gray-600">{entry.date}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to='/user/Logbook'
          className="mx-auto"
          >
            <button className="text-blue-500  border border-blue-500 rounded-lg w-sm mx-auto hover:bg-blue-500 hover:text-white">
              View all logbook entries
            </button>
          </Link>
          </div>          
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-1/3 h-105">
          <h1 className="font-bold text-xl">To-Do list</h1>
          <TodoList />
        </div>
      </div>
      <div>
        <CustomCalendar 
        attendanceData={attendanceData}
        variant="dashboardHome"
        />
      </div>
    </div>
   </>
   ) 
}

function DashboardCards({title, value, icon, color}){
  const colors = colorMap[color] || { bg: "bg-gray-100", text: "text-gray-600" };
  return(
    <>
      <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 h-36">
        <div>
          <p className="text-gray-600 mb-1">{title}</p>
          <h1 className="text-3xl font-bold">{value}</h1>
        </div>  
          <div className={`p-2 rounded-lg ${colors.bg} text-white`}>
            {icon}
          </div>      
        </div> 
    </>
  )
}

const colorMap = {
    blue: { bg: "bg-gradient-to-br from-blue-500 to-blue-600", text: "text-blue-600" },
    green: { bg: "bg-gradient-to-br from-green-500 to-green-600", text: "text-green-600" },
    purple: { bg: "bg-gradient-to-br from-purple-500 to-purple-600", text: "text-purple-600" },
    orange: { bg: "bg-gradient-to-br from-orange-500 to-orange-600", text: "text-orange-600" },
    teal: { bg: "bg-gradient-to-br from-teal-500 to-teal-600", text: "text-teal-600" }
};

