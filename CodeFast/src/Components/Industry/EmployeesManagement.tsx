"use client"

import { useEffect, useState } from "react"
import { X, Trash2, GraduationCap } from "lucide-react"
import axiosInstance from "../../Utils/axiosInstance"
import { toast } from "react-toastify"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import TopBar from "../Shared/Topbar"

interface Intern {
  id: number
  name: string
  picture: string
  degree: string
  university: string
  email: string
  enrollmentDate: string
  cgpa: number
  currentSemester: number
  completedCourses: string[]
  ongoingCourses: string[]
  jobName: string
}

const EmployeeManagement = () => {
  const [interns, setInterns] = useState<Intern[]>([])
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const getInterns = async () => {
    try {
      // Assuming there's an endpoint to get all interns for the current industry
      const response = await axiosInstance.get("/industry/interns")
        console.log("internssss = ",response.data)
      const formattedInterns = response.data.interns.map((intern: any) => ({
        id: intern._id,
        name: intern.studentId.name,
        picture: intern.studentId.picture || "",
        degree: intern.studentId.degree,
        university: intern.studentId.university?.name || "",
        email: intern.studentId.email,
        cgpa: intern.studentId.cgpa,
        enrollmentDate: new Date(intern.createdAt)
          .toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace(",", ""),
        currentSemester: intern.currentSemester || 1,
        completedCourses: intern.completedCourses || [],
        ongoingCourses: intern.ongoingCourses || [],
        jobName: intern.jobId.title || "",
      }))
    console.log("formattedInterns = ",formattedInterns)
      setInterns(formattedInterns)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching interns:", error)
      toast.error("Failed to fetch interns")
      setLoading(false)
    }
  }

  useEffect(() => {
    getInterns()
  }, [])

  const handleRemoveIntern = async (id: any) => {
    try {
      // Assuming there's an endpoint to remove an intern from the industry
      const res = await axiosInstance.delete(`/industry/interns/${id}`)
      setInterns(interns.filter((intern) => intern.id !== id))
      toast.success(res.data.message || "Intern removed successfully")
    } catch (error) {
      console.error("Error removing intern:", error)
      toast.error("Failed to remove intern")
    }
  }

  const handleInternClick = (intern: any) => {
    setSelectedIntern(intern)
    setShowDetailModal(true)
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
    setSelectedIntern(null)
  }

  if (loading)
    return (
      <div className="w-full p-6">
        <TopBar title="Employee Management" />
        <h2 className="text-2xl font-bold mb-6">Internship Students</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Degree
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                CGPA
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(5)
              .fill(Array(5))
              .map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Skeleton circle width={40} height={40} />
                      </div>
                      <div className="ml-4">
                        <Skeleton width={120} />
                        <Skeleton width={150} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={100} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={150} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={50} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={40} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )

  return (
    <div className="w-full p-6">
      <TopBar title="Employee Management" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Internship Students</h2>
        <div className="bg-indigo-100 text-indigo-800 py-1 px-4 rounded-full flex items-center">
          <GraduationCap className="h-4 w-4 mr-2" />
          <span>Total Interns: {interns.length}</span>
        </div>
      </div>

      {interns.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <GraduationCap className="h-12 w-12 mx-auto text-indigo-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Interns Found</h3>
          <p className="text-gray-500">There are currently no students enrolled in internships at your industry.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Degree
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  University
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  CGPA
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interns.map((intern) => (
                <tr
                  key={intern.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleInternClick(intern)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={intern.picture || "/placeholder.svg"}
                          alt={intern.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{intern.name}</div>
                        <div className="text-sm text-gray-500">{intern.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{intern.degree}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{intern.university}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{intern.cgpa}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveIntern(intern.id)
                      }}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                      title="Remove from internship"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Intern Detail Modal */}
      {showDetailModal && selectedIntern && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-indigo-600 text-white p-6 rounded-t-lg flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{selectedIntern?.name}</h3>
                <p className="text-indigo-100">{selectedIntern.email}</p>
              </div>
              <button
                onClick={closeDetailModal}
                className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <img
                  src={selectedIntern.picture || "/placeholder.svg"}
                  alt={selectedIntern.name}
                  className="h-40 w-40 rounded-full object-cover mb-4 border-4 border-indigo-100"
                />
                <div className="text-center">
                  <h4 className="text-xl font-semibold">{selectedIntern.name}</h4>
                  <p className="text-gray-600">{selectedIntern.university}</p>

                  <div className="flex flex-1 w-full justify-center">
                    <div className="mt-2 bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">
                      CGPA: {selectedIntern.cgpa}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Degree Program</h4>
                    <p>{selectedIntern.degree}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Current Semester</h4>
                    <p>{selectedIntern.currentSemester}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Internship Start Date</h4>
                    <p>{selectedIntern.enrollmentDate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">University</h4>
                    <p>{selectedIntern.university}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Job Title</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIntern.jobName }
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Ongoing Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIntern.ongoingCourses.length > 0 ? (
                      selectedIntern.ongoingCourses.map((course, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
                          {course}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No ongoing courses</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      handleRemoveIntern(selectedIntern.id)
                      closeDetailModal()
                    }}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove from Internship
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeManagement
