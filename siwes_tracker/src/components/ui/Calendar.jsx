import { useRef, useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import CustomCalendar from "./customCalender";
import { toDateKey } from "./customCalender";
import useAttendanceStore from "../../stores/attendanceStore";


export default function Calendar({ showTodayForm, setShowTodayForm }) {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const {attendanceData, setAttendanceData} = useAttendanceStore();

  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    comments: "",
  })
  const [attendanceStatus, setAttendanceStatus] = useState("Present");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // function to handle day selection
  const handleSelect = (day) => {
    setSelected(day);
    setShowForm(true);
  };

  // Handle "Mark Today" button click
  useEffect(() => {
    if (showTodayForm) {
      setSelected(new Date());
      setShowForm(true);
      setShowTodayForm(false); // Reset the prop
    }
  }, [showTodayForm, setShowTodayForm]);

  const handleAttendanceSubmit = (e) =>{
    e.preventDefault();
     // code to calculate total hours spent
  const start =  new Date(`1970-01-01T${formData.startTime}:00`);
  const end = new Date(`1970-01-01T${formData.endTime}:00`);

  const diffMs = end - start; // Difference in milliseconds
  const diffHours = diffMs/ (1000 * 60 * 60); // Convert to hours


    let hours;
    if (attendanceStatus === "Present") {
      hours = diffHours.toFixed(0);
      if (end < start){
        alert("CheckOut-time must be after check-in time")
        return;
      }
    } else {
      hours = 0;
    }
    const attendanceRecord ={
      date: toDateKey(selected),
      Status : attendanceStatus,
      hours: hours,
      comments: formData.comments,

    }
    setAttendanceData({
        ...attendanceData,
        [toDateKey(selected)]: attendanceRecord
    });

    setFormData({
      startTime: "",
      endTime: "",
      comments: "",
    });
    setShowForm(false);
    setAttendanceStatus("Present");
    setSelected(null);
  }

  const handleFormClose = () => {
    setShowForm(false);
    setSelected(null);
    setFormData({
      startTime: "",
      endTime: "",
      comments: "",
    });
    setAttendanceStatus("Present");
  };


  return (
    <div  className="flex gap-4 ">
    <CustomCalendar
    selected={selected}
    onSelect={handleSelect}
    attendanceData={attendanceData}
    className="mt-6 py-10"
    variant="calendar"
    />

    {showForm && (
      <div className="attendance-form absolute z-10 inset-0 flex items-center justify-center backdrop-blur-xs  backdrop-brightness-75">
        <AttendanceForm 
        selected={selected}
        setShowForm={handleFormClose}
        formData={formData}
        handleInputChange={handleInputChange}
        setAttendanceStatus={setAttendanceStatus}
        onAttendanceSubmit={handleAttendanceSubmit}
        attendanceStatus={attendanceStatus}
        />
      </div>
    )}
    <div className="attendance-records mt-6 bg-white rounded-lg shadow-md p-6 flex-1/3 overflow-y-auto max-h-128">
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      <div className="space-y-2 overflow-auto-y ">
        {Object.values(attendanceData).map((record, index) => (
          <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div className={`${record.Status === "Present" ? "bg-green-400" : "bg-red-400"} text-black p-2 rounded-xl `}>
              {record.Status === "Present" ? <CheckCircle/> : <XCircle/>}              
            </div>
            <div className="flex-1 ml-4">
              <h1 className="text-lg font-bold">{record.date}</h1>
              <p>{record.Status}</p>
            </div>
            <div>
            {record.hours > 0 && (<p className="border p-1 rounded-lg text-sm text-slate-800">{record.hours}h</p>)}
            </div>            
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

function AttendanceForm ({selected, setShowForm, formData, handleInputChange,onAttendanceSubmit, setAttendanceStatus, attendanceStatus}) {
  // Form is valid if:
  // - Status is "Absent"
  // - OR Status is "Present" AND both times are set and valid
  const isTimeValid = !!formData.startTime &&
    !!formData.endTime &&
    !!formData.startTime.trim() &&
    !!formData.endTime.trim() &&
    !!formData.startTime.match(/^\d{2}:\d{2}$/) &&
    !!formData.endTime.match(/^\d{2}:\d{2}$/) ;

  const isFormValid =
  !!attendanceStatus &&
  (
    attendanceStatus === "Absent" ||
    (attendanceStatus === "Present" && isTimeValid)
  )
   const modalRef = useRef(null);

    useEffect(()=>{
      function handleClickOutside(event){
        if(modalRef.current && !modalRef.current.contains(event.target)){
          setShowForm(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    },[modalRef])
    return(
      <>
      <form className="bg-white rounded-2xl p-4 shadow-lg w-100 " ref={modalRef} onSubmit={onAttendanceSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl ">Mark Attendance - {selected.toLocaleDateString()}</h1>
          <span className=" font-bold cursor-pointer hover:scale-120 transition-transform"
            onClick={() => setShowForm(false)}>X</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <input type="button" value="Present" 
          className={` px-4 py-2 rounded w-40  active:translate-0.5 border cursor-pointer ${
                      attendanceStatus === 'Present'
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'border-gray-300 hover:border-gray-700'
                    } `}
          onClick={(e)=> setAttendanceStatus(e.target.value)} />
          <input type="button" value="Absent" 
          className={` px-4 py-2 rounded w-40 border active:translate-0.5 cursor-pointer ${
                      attendanceStatus === 'Absent'
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'border-gray-300 hover:border-gray-700'
                    } `} 
          onClick={(e)=> setAttendanceStatus(e.target.value)} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className=" flex flex-col gap-1">
          <label htmlFor="start-time">Check In Time:</label>
          <input type="time" name="startTime" onChange={handleInputChange} value={formData.startTime} className="border border-gray-300 rounded p-1 w-40"/>
          </div>
          <div className=" flex flex-col gap-1">
          <label htmlFor="end-time">Check Out Time:</label>
          <input type="time" name="endTime" onChange={handleInputChange} value={formData.endTime} className="border border-gray-300 rounded p-1 w-40"/>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="comments">Notes (optional)</label>
          <textarea name="comments" onChange={handleInputChange} value={formData.comments} className="border border-gray-300 rounded p-2"></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" 
          className={`bg-blue-500 text-white px-4 py-2  rounded ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""} cursor-pointer`}
          disabled={!isFormValid}>
            Mark Attendance</button>
        </div>
      </form>
      </>
    )
}
