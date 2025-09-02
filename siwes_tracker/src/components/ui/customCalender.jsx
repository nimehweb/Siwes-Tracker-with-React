import {useState} from "react";
import { Calendar, ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

const pad = (n) => String(n).padStart(2,"0");

export const toDateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
// The toDateKey function returns a key string that represents the date in year-month-day format, with two digit month and day values

function CustomCalendar({selected, onSelect, attendanceData, variant}) { 
  const today = new Date();

  const [currentDate, setCurrentDate] = useState({
    month: today.getMonth(),
    year: today.getFullYear()
  })

  function buildDaysArray (year, month, weekStartsOn = 0){ // <-- Change to 0 for Sunday
    const firstDayOfMonth = new Date (year, month, 1);
    // This line creates a new date object for the first day of the given month
    
    let firstDayIndex = firstDayOfMonth.getDay();
    // This line gets the day of the week for that date, returns 0 for Sunday, 1 for Monday,...., 6 for Saturday
  
    if (weekStartsOn === 1) {
      firstDayIndex = (firstDayIndex + 6) % 7;
    }
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Calculate the number of days in the month
    // new Date(year, month + 1, 0) gives the last day of the month
    // .getDate() extracts the day number
    const daysArray = [];

    for(let i = 0; i < firstDayIndex; i++){
        daysArray.push(null);
    // This loop fills the daysArray with null values for the days before the first day of the month
    }

    for(let day = 1; day <= daysInMonth; day++){
        daysArray.push(new Date(year, month, day));
        // This loop fills the daysArray with date objects for each day of the month
    }

    // Pad end of array so last week is complete
    while (daysArray.length % 7 !== 0) {
      daysArray.push(null);
      // This loop adds null values to the end of the daysArray until its length is divisible by 7 ensuring the last week is complete
    }

    return daysArray;
  }

  const daysArray = buildDaysArray(currentDate.year, currentDate.month, 0); // <-- Pass 0 for Sunday

  //code to handle navigation prev/ next month
  const goToPrevMonth =() =>{
    setCurrentDate(({month,year})=>{
      if(month === 0){
        return{month:11, year: year-1}
      }
      return{month: month-1, year}
    })
  }

  const goToNextMonth = ()=>{
    setCurrentDate(({month,year})=>{
      if(month === 11){
        return{month:0, year: year + 1}
      }
      return{month: month + 1, year}
    })  
  }
   const calendarClass =
   variant === "dashboardHome" 
    ? "w-full mt-10 "
    : "h-128"
  return (
    <div className={`p-10 bg-white rounded-lg shadow-md w-164 mt-6 ${calendarClass}`}>
        {
              variant === "dashboardHome" && (
                <div className="flex gap-2 items-center mb-4">
                  <Calendar className="text-gray-400" />
                  <h1 className="font-bold text-2xl ">Monthly Attendance Overview</h1>
                </div>
              )
        }
        <div className="flex items-center justify-between  mb-6">
             <div className="flex gap-2 items-center">
              {variant === "dashboardHome" || <Calendar className="text-gray-400" />}
              <span className="font-semibold text-xl text-slate-600">{`${new Date(currentDate.year, currentDate.month).toLocaleString("default", { month: "long" })} ${currentDate.year}`}</span>
             </div>
             <div className="flex gap-2">
              <ChevronLeftCircle onClick={goToPrevMonth} className=" w-8 h-8 rounded-full text-slate-700 hover:bg-slate-100" />
              <ChevronRightCircle onClick={goToNextMonth} className=" w-8 h-8 rounded-full text-slate-700 hover:bg-slate-100" />
             </div>
           
        </div>
        <div className="grid grid-cols-7 gap-4 text-center font-semibold text-xl mb-2 mt-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
        </div>
      <div className="grid grid-cols-7 gap-4">
        {daysArray.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-12"></div>;
          }
          const isSelected =
            selected &&
            day &&
            day.toDateString() === selected.toDateString();
          
         const key = toDateKey(day);
         const record = attendanceData[key];

         const todayKey = toDateKey(today);
         const isToday = key === todayKey;
         
         let statusClass = "";
         if (record) {
           statusClass = record.Status === "Present" ? "bg-green-200 " : "bg-red-100";
         }
         
         let noRecordClass = "";
         if (
          variant === "dashboardHome" &&
          !record
        ) {
          noRecordClass = "bg-slate-100";
        }
          return (
            <div
              key={key}
              className={`h-12 flex items-center justify-center rounded-lg cursor-pointer hover:bg-slate-100 
    ${isSelected ? "bg-slate-400 font-bold" : ""} 
    ${statusClass} 
    ${isToday ? "border-2 border-blue-500 font-bold text-blue-700 bg-blue-100 shadow-md" : ""} 
    ${noRecordClass}`}
              onClick={() => day && onSelect(day)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
      
        {variant === "dashboardHome" &&(
          <div className="flex gap-4 mt-6 text-sm justify-center text-slate-600">
          <div className="flex gap-2 items-center"><div className=" rounded-full h-2 w-2 bg-green-200"></div>Present</div>
          <div className="flex gap-2 items-center"><div className=" rounded-full h-2 w-2 bg-red-200"></div>Absent</div>
          <div className="flex gap-2 items-center"><div className=" rounded-full h-2 w-2 bg-slate-200"></div>Future</div>
          </div>
        )}
      
    </div>
  );
}

export default CustomCalendar;