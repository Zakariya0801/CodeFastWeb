"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Pencil } from "lucide-react"

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("edit-profile")
  const [profileImage, setProfileImage] = useState<string>(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VWbcYzT5RxpkLfQpKovWubkDqLd8M4.png",
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<{
    name: string
    email: string
    dob: string
    password: string
    cgpa: string
  }>({
    name: "Charlene Reed",
    email: "charlenereed@gmail.com",
    dob: "1990-01-25", // Updated to match the format for date input
    password: "••••••••••",
    cgpa: "3.5", // Fixed to be a proper CGPA value
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click()
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "edit-profile" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
          }`}
          onClick={() => handleTabChange("edit-profile")}
        >
          Edit Profile
        </button>
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "security" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
          }`}
          onClick={() => handleTabChange("security")}
        >
          Security
        </button>
      </div>

      {/* Profile Picture */}
      <div className="flex mb-8">
        <div className="relative">
          <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          <button
            type="button"
            onClick={handleProfilePictureClick}
            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full"
          >
            <Pencil size={16} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* CGPA */}
          <div>
            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700 mb-1">
              CGPA
            </label>
            <input
              type="text"
              id="cgpa"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings