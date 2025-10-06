import { useState } from "react";
import { FileText, Download, Calendar, ChartBar as BarChart3, ListFilter as Filter, Eye } from "lucide-react";
import useLogbookStore from "../../stores/logbookStore";
import useAttendanceStore from "../../stores/attendanceStore";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("logbook");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { entries } = useLogbookStore();
  const { attendanceData, getStats } = useAttendanceStore();
  const stats = getStats();

  const reportTypes = [
    { id: "logbook", name: "Logbook Report", icon: FileText, description: "Complete logbook entries with activities and progress" },
    { id: "attendance", name: "Attendance Report", icon: Calendar, description: "Detailed attendance records and statistics" },
    { id: "summary", name: "Training Summary", icon: BarChart3, description: "Overall training progress and achievements" },
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would implement actual PDF generation
      alert(`${reportTypes.find(r => r.id === selectedReport)?.name} generated successfully!`);
    }, 2000);
  };

  const filteredEntries = entries.filter(entry => {
    if (!dateRange.start || !dateRange.end) return true;
    const entryDate = new Date(entry.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    return entryDate >= startDate && entryDate <= endDate;
  });

  const filteredAttendance = Object.values(attendanceData).filter(record => {
    if (!dateRange.start || !dateRange.end) return true;
    const recordDate = new Date(record.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    return recordDate >= startDate && recordDate <= endDate;
  });

  return (
    <div className="p-10 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-600">Generate and export your training reports</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-lg px-4 py-2 hover:from-blue-700 hover:to-teal-700 transition duration-300 ease-in-out flex items-center disabled:opacity-50"
        >
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate Report"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Type Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-500" />
              Report Options
            </h2>
            
            <div className="space-y-3 mb-6">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedReport === report.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <report.icon className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="font-medium">{report.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Date Range Filter</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-500" />
                Report Preview
              </h2>
              <span className="text-sm text-gray-500">
                {selectedReport === "logbook" && `${filteredEntries.length} entries`}
                {selectedReport === "attendance" && `${filteredAttendance.length} records`}
                {selectedReport === "summary" && "Complete overview"}
              </span>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
              {selectedReport === "logbook" && (
                <LogbookPreview entries={filteredEntries} />
              )}
              {selectedReport === "attendance" && (
                <AttendancePreview records={filteredAttendance} stats={stats} />
              )}
              {selectedReport === "summary" && (
                <SummaryPreview entries={entries} stats={stats} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogbookPreview({ entries }) {
  if (entries.length === 0) {
    return <p className="text-gray-500 text-center py-8">No logbook entries found for the selected date range.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Daily Training Activities</h3>
      {entries.map((entry, index) => (
        <div key={index} className="bg-white p-4 rounded border">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">{entry.title}</h4>
            <span className="text-sm text-gray-500">{entry.date}</span>
          </div>
          <p className="text-gray-700 text-sm">{entry.description}</p>
        </div>
      ))}
    </div>
  );
}

function AttendancePreview({ records, stats }) {
  if (records.length === 0) {
    return <p className="text-gray-500 text-center py-8">No attendance records found for the selected date range.</p>;
  }

  const attendanceRate = stats.totalDays > 0 ? ((stats.presentDays / stats.totalDays) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Attendance Summary</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-100 p-3 rounded text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalDays}</div>
          <div className="text-sm text-blue-600">Total Days</div>
        </div>
        <div className="bg-green-100 p-3 rounded text-center">
          <div className="text-2xl font-bold text-green-600">{stats.presentDays}</div>
          <div className="text-sm text-green-600">Present Days</div>
        </div>
        <div className="bg-purple-100 p-3 rounded text-center">
          <div className="text-2xl font-bold text-purple-600">{attendanceRate}%</div>
          <div className="text-sm text-purple-600">Attendance Rate</div>
        </div>
      </div>

      <div className="space-y-2">
        {records.map((record, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
            <span>{record.date}</span>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${
                record.Status === "Present" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}>
                {record.Status}
              </span>
              {record.hours > 0 && <span className="text-sm text-gray-500">{record.hours}h</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryPreview({ entries, stats }) {
  const attendanceRate = stats.totalDays > 0 ? ((stats.presentDays / stats.totalDays) * 100).toFixed(1) : 0;
  
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg border-b pb-2">Training Summary Report</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-medium text-blue-800 mb-2">Logbook Statistics</h4>
          <div className="space-y-1 text-sm">
            <div>Total Entries: <span className="font-medium">{entries.length}</span></div>
            <div>Average per Week: <span className="font-medium">{(entries.length / 12).toFixed(1)}</span></div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-medium text-green-800 mb-2">Attendance Statistics</h4>
          <div className="space-y-1 text-sm">
            <div>Attendance Rate: <span className="font-medium">{attendanceRate}%</span></div>
            <div>Total Hours: <span className="font-medium">{stats.totalHours}h</span></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-medium mb-2">Recent Activities</h4>
        <div className="space-y-2">
          {entries.slice(-3).map((entry, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">{entry.date}:</span> {entry.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}