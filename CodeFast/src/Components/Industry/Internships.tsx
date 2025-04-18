"use client"

import type React from "react"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import TopBar from "../Shared/Topbar"
import { useEffect, useState } from "react"
import { Trash2, Plus } from "lucide-react"
import axiosInstance from "../../Utils/axiosInstance"
import { toast } from "react-toastify"

function Internships() {
  const [Internships, setInternships] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newInternship, setNewInternship] = useState({
    title: "",
    status: "OPEN",
    salary: "",
    location: "",
    description: "",
  })

  const getInternships = async () => {
    try {
      const response = await axiosInstance.get("/jobs/") // Replace with your API endpoint
      console.log("Internships response:", response.data)
      setInternships(response.data)
    } catch (error) {
      console.error("Error fetching internships:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleJobDelete = async (jobId: string) => {
    try {
      await axiosInstance.delete(`/jobs/${jobId}/`) // Replace with your API endpoint
      setInternships((prevInternships) => prevInternships.filter((internship) => internship._id !== jobId))
      toast.success("Internship deleted successfully!")
    } catch (error) {
      console.error("Error deleting internship:", error)
      toast.error("Failed to delete internship. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewInternship({
      ...newInternship,
      [name]: name === "salary" ? value.replace(/\D/g, "") : value,
    })
  }

  const handleAddInternship = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/jobs/", {
        ...newInternship,
        salary: Number.parseInt(newInternship.salary),
      })
      console.log("New internship response:", response.data)
      setInternships([...Internships, response.data])
      setShowModal(false)
      setNewInternship({
        title: "",
        status: "OPEN",
        salary: "",
        location: "",
        description: ""
      })
      toast.success("Internship added successfully!")
    } catch (error) {
      console.error("Error adding internship:", error)
      toast.error("Failed to add internship. Please try again.")
    }
  }

  useEffect(() => {
    getInternships()
  }, [])
  if (loading)
    return (
      <div className="w-full p-6">
        <TopBar title="Internships" />
        <h2 className="text-2xl font-bold mb-6">Internships</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600">
            <tr>
              <th scope="col" className="pl-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Internship
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Start
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                End
              </th>
              <th scope="col" className="px-0 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Interns
              </th>
              <th scope="col" className="pr-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="pr-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Delete
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
    <div className="w-full py-3 px-2">
      <TopBar title="Internships" />
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-bold">All Internships</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Internship
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600">
            <tr>
              <th scope="col" className="pl-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Internship
              </th>
              <th scope="col" className="pl-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="pl-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Salary
              </th>
              <th scope="col" className="pl-0 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Interns
              </th>
              <th scope="col" className="pr-0 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="py-3 text-left text-xs font-medium text-white uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Internships.map((internship) => (
              <tr key={internship.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="pl-3 pr-0 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{internship.title}</div>
                </td>
                <td className="pl-2 py-4 whitespace-nowrap">
                  <div className={`text-sm ${internship.status === "OPEN" ? "text-green-500" : "text-red-500"}`}>
                    {internship.status}
                  </div>
                </td>
                <td className="pl-2 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Rs. {internship.salary}k</div>
                </td>
                <td className="pl-0 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{internship.appliedStudents.length}</div>
                </td>
                <td className="pl-0 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{internship.location}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                    onClick={() => handleJobDelete(internship._id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Internship Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Internship</h3>
            <form onSubmit={handleAddInternship}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newInternship.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newInternship.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newInternship.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary (in thousands)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">Rs.</span>
                  </div>
                  <input
                    type="text"
                    name="salary"
                    value={newInternship.salary}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="15"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">k</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newInternship.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Add Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Internships
