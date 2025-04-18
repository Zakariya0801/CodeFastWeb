"use client"

import { useEffect, useState } from "react"
import TopBar from "../Shared/Topbar"
import axiosInstance from "../../Utils/axiosInstance"

interface IStudent {
    _id: number
    name: string
    university: string
    sPerformance: number
    cgpa: number
    courses: string[]
}


const StudentLeaderboard = () => {
  const [internships, setInternships] = useState([])
  const [students, setStudents] = useState<IStudent[]>([])
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showInternshipModal, setShowInternshipModal] = useState(false)
  const getInternships = async () => {
    try {
      const response = await axiosInstance.get("/jobs/") // Replace with your API endpoint
      setInternships(response.data)
    } catch (error) {
      console.error("Error fetching internships:", error)
    } finally {
    //   setLoading(false)
    }
  }
  useEffect(() => {
    const fetchStudents = async () => {
        const response = await axiosInstance.get("/performance");
        setStudents(response.data);
    }
    fetchStudents();
    getInternships();
  },[]);
  // Sort students by SPerformance (highest first)
  const sortedStudents = [...students].sort((a, b) => b.sPerformance - a.sPerformance)

  const openStudentDetails = (student:any) => {
    setSelectedStudent(student)
    setShowStudentModal(true)
  }

  const closeStudentModal = () => {
    setShowStudentModal(false)
  }

  const openInternshipModal = () => {
    setShowInternshipModal(true)
  }

  const closeInternshipModal = () => {
    setShowInternshipModal(false)
  }

  const offerInternship = (internshipId:string) => {
    // This function will be implemented later
    if(!selectedStudent) return
    console.log(`Offering internship ${internshipId} to student ${selectedStudent._id}`)
    closeInternshipModal()
    closeStudentModal()
  }

  return (
    <div>
        <TopBar title="LeaderBoard"/>
        <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Leaderboard</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-indigo-600 text-white px-6 py-4 flex items-center">
                <div className="flex-1 grid grid-cols-5 font-medium">
                <div>STUDENT NAME</div>
                <div>UNIVERSITY</div>
                <div>PERFORMANCE</div>
                <div>CGPA</div>
                <div>REGISTERED COURSES</div>
                </div>
            </div>

            <div className="divide-y divide-gray-200">
                {sortedStudents.map((student) => (
                <div key={student._id} className="px-6 py-4 flex items-center hover:bg-gray-50">
                    <div className="flex-1 grid grid-cols-5">
                    <div
                        className="font-medium text-indigo-600 cursor-pointer hover:underline"
                        onClick={() => openStudentDetails(student)}
                    >
                        {student.name}
                    </div>
                    <div>{student.university}</div>
                    <div>{student.sPerformance.toFixed(1)}</div>
                    <div>{student.cgpa.toFixed(1)}</div>
                    <div>{student.courses.length}</div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Student Details Modal */}
        {showStudentModal && selectedStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Student Details</h2>
                <button onClick={closeStudentModal} className="text-white hover:text-indigo-100">
                    ✕
                </button>
                </div>

                <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedStudent.name}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">University</p>
                    <p className="font-medium">{selectedStudent.university}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Performance Score</p>
                    <p className="font-medium">{selectedStudent.sPerformance.toFixed(1)}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">CGPA</p>
                    <p className="font-medium">{selectedStudent.cgpa.toFixed(1)}</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Completed Courses</p>
                    <p className="font-medium">{selectedStudent.courses.length}</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500 mb-2">Courses Completed</p>
                    <div className="flex flex-wrap gap-2">
                    {selectedStudent.courses.map((course, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                        {course}
                        </span>
                    ))}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                    onClick={openInternshipModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                    Offer Internship
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Internship Selection Modal */}
        {showInternshipModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Available Internships</h2>
                <button onClick={closeInternshipModal} className="text-white hover:text-indigo-100">
                    ✕
                </button>
                </div>

                <div className="p-6">
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="bg-indigo-600 text-white px-6 py-3 flex items-center">
                    <div className="flex-1 grid grid-cols-4 font-medium">
                        <div>INTERNSHIP</div>
                        <div>STATUS</div>
                        <div>SALARY</div>
                        <div>LOCATION</div>
                    </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                    {internships.map((internship:any) => (
                        <div key={internship._id} className="px-6 py-3 flex items-center hover:bg-gray-50">
                        <div className="flex-1 grid grid-cols-4">
                            <div
                            className="font-medium text-indigo-600 cursor-pointer hover:underline"
                            onClick={() => offerInternship(internship._id)}
                            >
                            {internship.title}
                            </div>
                            <div className="text-green-500">{internship.status}</div>
                            <div>Rs. {internship.salary}k</div>
                            <div>{internship.location}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    </div>
  )
}

export default StudentLeaderboard
