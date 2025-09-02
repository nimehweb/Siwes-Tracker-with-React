import { create } from "zustand";

const useAttendanceStore = create ((set,get) =>{
    return{
        attendanceData: {},
        setAttendanceData: (data) => set({attendanceData: data}),
        getStats: () => {
            const data = get().attendanceData;
            const totalDays = Object.keys(data).length;
            const presentDays = Object.values(data).filter(record => record.Status === "Present").length;
            const totalHours = Object.values(data).reduce(
                (sum,record) => sum + (record.Hours || 0), 0
            )
            
            return {
                totalDays,
                presentDays,
                totalHours
            }
        }
    }
})

export default useAttendanceStore;