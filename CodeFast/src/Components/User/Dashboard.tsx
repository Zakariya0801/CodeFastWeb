import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import LineGraphComponent from "../Shared/Graphs/LineGraphComponent";
import TopBar from "../Shared/Topbar";
import { useGlobalContext } from "../Auth/GlobalProvider";
import axiosInstance from "../../Utils/axiosInstance";
import { useEffect, useState } from "react";

function Dashboard() {
  const { user, isDarkMode } = useGlobalContext();
  const [linechartData, setLineData] = useState([]);

  useEffect(() => {
    const getAnalytics = async () => {
      const { data } = await axiosInstance.get("/user/analytics");
      console.log("logs = ", data.logs)
      setLineData(data.logs);
    };
    getAnalytics();
  }, []);

  const expertiseData = [
    { name: "DB", value: 35, color: "#3b5bdb" },
    { name: "Data Structures", value: 30, color: "#364063" },
    { name: "Operating Systems", value: 20, color: "#f06595" },
    { name: "Algorithms", value: 15, color: "#fd7e14" },
  ];

  const QuizData = [
    { name: "Data Structures", date: "13 October 2024", increment: "+123" },
    { name: "Algorithms", date: "10 September 2024", increment: "+12" },
    { name: "Database Systems", date: "1 January 2024", increment: "+1" },
  ];

  return (
    <div className={`py-0 px-0 space-y-10 w-full  overflow-x-hidden ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
      <TopBar title="Overview" />

      <div className="flex h-full flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>My Information</h2>
          <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 ${isDarkMode ? 'text-white' : 'text-white'}`}>
            <p className=" text-blue-200">Name</p>
            <p className="text-xl font-bold">{user?.name}</p>
            <p className=" text-blue-200 mt-4">Degree</p>
            <p className="text-xl font-medium">{user?.degree}</p>
            <div className="flex flex-1 justify-between">
              <div>
                <p className=" text-blue-200 mt-4">CGPA</p>
                <p className="text-lg font-medium">{user?.cgpa}</p>
              </div>
              <div>
                <p className=" text-blue-200 mt-4">Student Performance</p>
                <p className="text-xl font-medium">{user?.sPerformance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Recent Quizzes</h2>
          {QuizData.map((quiz, index) => (
            <div key={index} className={`flex items-center p-3 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} w-full`}>
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">{quiz.name}</p>
                <p className="text-sm">{quiz.date}</p>
              </div>
              <div className="text-green-500 font-medium">{quiz.increment}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex h-full flex-col lg:flex-row gap-6">
        {/* Line Chart */}
        <div className={`flex-1 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Daily Activity</h2>
          <LineGraphComponent data={linechartData} dataKey="date" />
        </div>

        {/* Pie Chart */}
        <div className={`flex-1 p-6 rounded-lg shadow items-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Topic Expertise</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expertiseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expertiseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
