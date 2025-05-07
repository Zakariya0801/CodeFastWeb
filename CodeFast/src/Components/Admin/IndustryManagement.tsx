"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X, Trash2, Plus } from "lucide-react"
import axiosInstance from "../../Utils/axiosInstance"
import { toast } from "react-toastify"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import TopBar from "../Shared/Topbar"

interface Industry {
  id: number
  name: string
  description: string
  email: string
  status: number
  picture: string
  createdAt: string
}

const IndustryManagement = () => {
  const [industries, setIndustries] = useState<Industry[]>([])
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newIndustry, setNewIndustry] = useState({
    name: "",
    description: "",
    email: "",
    password: "",
    picture: "",
  })

  const getIndustries = async () => {
    try {
      const response = await axiosInstance.get("/industry")
        console.log(response.data)
      const formattedIndustries = response.data.industries.map((industry: any) => ({
        id: industry._id,
        name: industry.name,
        description: industry.description || "",
        email: industry.email,
        status: industry.status,
        picture: industry.picture || "",
        createdAt: new Date(industry.createdAt)
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
      }))

      setIndustries(formattedIndustries)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching industries:", error)
      toast.error("Failed to fetch industries")
      setLoading(false)
    }
  }

  useEffect(() => {
    getIndustries()
  }, [])

  const handleRemoveIndustry = async (id: any) => {
    try {
      const res = await axiosInstance.delete(`/industry/${id}`)
      setIndustries(industries.filter((industry) => industry.id !== id))
      toast.success(res.data.message || "Industry removed successfully")
    } catch (error) {
      console.error("Error removing industry:", error)
      toast.error("Failed to remove industry")
    }
  }

  const handleIndustryClick = (industry: any) => {
    setSelectedIndustry(industry)
    setShowDetailModal(true)
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
    setSelectedIndustry(null)
  }

  const openAddModal = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
    setNewIndustry({
      name: "",
      description: "",
      email: "",
      password: "",
      picture: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewIndustry((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddIndustry = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axiosInstance.post("/industry", newIndustry)
      toast.success("Industry added successfully")
      closeAddModal()
      getIndustries() // Refresh the list
    } catch (error) {
      console.error("Error adding industry:", error)
      toast.error("Failed to add industry")
    }
  }

  if (loading)
    return (
      <div className="w-full p-6">
        <TopBar title="Industry Management" />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Registered Industries</h2>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Industry
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Industry
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
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
                    <Skeleton width={200} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={80} />
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
      <TopBar title="Industry Management" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Registered Industries</h2>
        <button
          onClick={openAddModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Industry
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Industry
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {industries.map((industry) => (
              <tr
                key={industry.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleIndustryClick(industry)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={industry.picture || "/placeholder.svg"}
                        alt={industry.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{industry.name}</div>
                      <div className="text-sm text-gray-500">{industry.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {industry.description.length > 50
                      ? `${industry.description.substring(0, 50)}...`
                      : industry.description || "No description"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      industry.status === 1 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {industry.status === 1 ? "Registered" : "Not Registered"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveIndustry(industry.id)
                    }}
                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Industry Detail Modal */}
      {showDetailModal && selectedIndustry && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-indigo-600 text-white p-6 rounded-t-lg flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{selectedIndustry?.name}</h3>
                <p className="text-indigo-100">{selectedIndustry.email}</p>
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
                  src={selectedIndustry.picture || "/placeholder.svg"}
                  alt={selectedIndustry.name}
                  className="h-40 w-40 rounded-full object-cover mb-4 border-4 border-indigo-100"
                />
                <div className="text-center">
                  <h4 className="text-xl font-semibold">{selectedIndustry.name}</h4>
                  <div className="flex flex-1 w-full justify-center">
                    <div
                      className={`mt-2 py-1 px-3 rounded-full ${
                        selectedIndustry.status === 1 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedIndustry.status === 1 ? "Registered" : "Not Registered"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                    <p>{selectedIndustry.description || "No description provided"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Email</h4>
                    <p>{selectedIndustry.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Registration Date</h4>
                    <p>{selectedIndustry.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Industry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-indigo-600 text-white p-6 rounded-t-lg flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">Add New Industry</h3>
                <p className="text-indigo-100">Enter industry details below</p>
              </div>
              <button
                onClick={closeAddModal}
                className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddIndustry} className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newIndustry.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newIndustry.description}
                    onChange={handleInputChange}
                    maxLength={250}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">{newIndustry.description.length}/250 characters</p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newIndustry.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newIndustry.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                </div>

                <div>
                  <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture URL
                  </label>
                  <input
                    type="text"
                    id="picture"
                    name="picture"
                    value={newIndustry.picture}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Add Industry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndustryManagement
