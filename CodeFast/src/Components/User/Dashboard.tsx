"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import LineGraphComponent from "../Shared/Graphs/LineGraphComponent"
import TopBar from "../Shared/Topbar"
import { useGlobalContext } from "../Auth/GlobalProvider"
import axiosInstance from "../../Utils/axiosInstance"
import { useEffect, useState } from "react"
import { BookOpen, CloudLightningIcon as Lightning, TrendingUp } from "lucide-react"

function Dashboard() {
  const { user, isDarkMode } = useGlobalContext()
  const [linechartData, setLineData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAnalytics = async () => {
      setIsLoading(true)
      try {
        const { data } = await axiosInstance.get("/user/analytics")
        console.log("logs = ", data.logs)
        setLineData(data.logs)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }
    getAnalytics()
  }, [])

  const expertiseData = [
    { name: "DB", value: 35, color: "#3b5bdb" },
    { name: "Data Structures", value: 30, color: "#364063" },
    { name: "Operating Systems", value: 20, color: "#f06595" },
    { name: "Algorithms", value: 15, color: "#fd7e14" },
  ]

  const QuizData = [
    { name: "Data Structures", date: "13 October 2024", increment: "+123" },
    { name: "Algorithms", date: "10 September 2024", increment: "+12" },
    { name: "Database Systems", date: "1 January 2024", increment: "+1" },
  ]

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-200 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <TopBar title="Overview" />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left Section - User Information */}
          <div
            className={`flex-1 rounded-lg shadow-lg overflow-hidden transition-colors duration-200 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                My Information
              </h2>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white shadow-md">
                <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Name</p>
                <p className="text-xl font-bold mb-4">{user?.name || "Loading..."}</p>

                <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Degree</p>
                <p className="text-lg font-medium mb-4">{user?.degree || "Loading..."}</p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">CGPA</p>
                    <p className="text-lg font-medium">{user?.cgpa || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Student Performance</p>
                    <p className="text-lg font-medium">{user?.sPerformance.toFixed(2) || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Recent Quizzes */}
          <div
            className={`flex-1 rounded-lg shadow-lg transition-colors duration-200 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                Recent Quizzes
              </h2>
              <div className="space-y-3">
                {QuizData.map((quiz, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isDarkMode ? "hover:bg-gray-800 bg-gray-800/50" : "hover:bg-gray-50 bg-gray-50/50"
                    }`}
                  >
                    <div className={`p-3 rounded-full mr-4 ${isDarkMode ? "bg-blue-900/50" : "bg-blue-100"}`}>
                      <Lightning className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{quiz.name}</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{quiz.date}</p>
                    </div>
                    <div className="text-green-500 font-medium">{quiz.increment}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Line Chart */}
          <div
            className={`flex-1 rounded-lg shadow-lg transition-colors duration-200 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`h-5 w-5 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
                  <span>Daily Activity</span>
                </div>
              </h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                  <LineGraphComponent data={linechartData} dataKey="date" />
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div
            className={`flex-1 rounded-lg shadow-lg transition-colors duration-200 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                <div className="flex items-center gap-2">
                  <BookOpen className={`h-5 w-5 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
                  <span>Topic Expertise</span>
                </div>
              </h2>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expertiseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {expertiseData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={isDarkMode ? "#1f2937" : "#ffffff"}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {expertiseData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
