import ComingSoon from "../app_components/ComingSoon"
import { CheckCircle , TrendingUp, Clock, CalendarCheck2} from "lucide-react";
import Calendar from "../ui/Calendar"
import { use, useState } from "react";
import useAttendanceStore from "../../stores/attendanceStore";

export default function Attendance(){
  const [showTodayForm, setShowTodayForm] = useState(false);

  const handleMarkToday = () => {
    setShowTodayForm(true);
  };

  const getStats = useAttendanceStore((state) => state.getStats);
  const { totalDays, presentDays, totalHours } = getStats();

   return(
    <>
     <div className="p-10 h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="">
              <h1 className="text-3xl font-bold">Attendance</h1>
              <p className="text-gray-600">View and manage your attendance records</p>
            </div>
            <button 
              onClick={handleMarkToday}
              className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-lg px-4 py-2 hover:from-blue-700 hover:to-teal-700 transition duration-300 ease-in-out flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
               Mark Today
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <StatsCards title="Attendance Rate" value={`0`} icon={<TrendingUp />}  color ='blue' />
            <StatsCards title="Present Days" value={presentDays} icon={<CheckCircle />} color ='green' />
            <StatsCards title="Total Hours" value={`${totalHours}h`} icon={<Clock />} color = 'purple' />
            <StatsCards title="Days Tracked" value={totalDays} icon={<CalendarCheck2 />}  color = 'teal'/>
          </div>
          <div >
            <Calendar 
              showTodayForm={showTodayForm}
              setShowTodayForm={setShowTodayForm}
            />
          </div>
    </div>
   </>
   ) 
}

function StatsCards({title, value, icon, color}){
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
