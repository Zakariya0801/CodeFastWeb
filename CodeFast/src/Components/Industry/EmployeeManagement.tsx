"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import TopBar from "../Shared/Topbar"
import axiosInstance from "../../Utils/axiosInstance"

interface IStudent {
  _id: number
  name: string
  university: string
  sPerformance: number
  cgpa: number
  Internship: string
}

const EmployeeManagement = () => {
  const [students, setStudents] = useState<IStudent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get("/performance")
        setStudents(response.data)
      } catch (error) {
        console.error("Error fetching students:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  // Sort students by SPerformance (highest first)
  const sortedStudents = [...students].sort((a, b) => b.sPerformance - a.sPerformance)

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/performance/${id}`)
      setStudents(students.filter((student) => student._id !== id))
    } catch (error) {
      console.error("Error deleting student:", error)
    }
  }

  return (
    <div>
      <TopBar title="LeaderBoard" />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Employee Management</h1>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-indigo-600 text-white px-6 py-4 flex items-center">
              <div className="flex-1 grid grid-cols-6 font-medium">
                <div>STUDENT NAME</div>
                <div>UNIVERSITY</div>
                <div>PERFORMANCE</div>
                <div>CGPA</div>
                <div>INTERNSHIP</div>
                <div>ACTIONS</div>
              </div>
            </div>

            {loading ? (
              <div className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="px-6 py-4 flex items-center">
                    <div className="flex-1 grid grid-cols-6 gap-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {sortedStudents.map((student) => (
                  <div key={student._id} className="px-6 py-4 flex items-center hover:bg-gray-50">
                    <div className="flex-1 grid grid-cols-6">
                      <div className="font-medium text-indigo-600 cursor-pointer hover:underline">{student.name}</div>
                      <div>{student.university}</div>
                      <div>{student.sPerformance.toFixed(1)}</div>
                      <div>{student.cgpa.toFixed(1)}</div>
                      <div>{student.Internship}</div>
                      <div>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Delete employee"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeManagement
