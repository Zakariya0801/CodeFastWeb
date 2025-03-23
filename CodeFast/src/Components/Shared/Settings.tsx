"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Pencil, CheckCircle } from "lucide-react"
import authService from "../Auth/authService"
import { useNavigate } from "react-router-dom"
import { uploadImage } from "../../Utils/Cloudinary"
import axiosInstance from "../../Utils/axiosInstance"
import { toast } from "react-toastify"

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("edit-profile")
  const [profileImage, setProfileImage] = useState<string>(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VWbcYzT5RxpkLfQpKovWubkDqLd8M4.png",
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const [errors, setErrors] = useState<{
    profile: { [key: string]: string }
    security: { [key: string]: string }
  }>({
    profile: {},
    security: {},
  })
  const getUSer = async () => {
    const response = await authService.getUser()
    console.log(response)
    setUser(response)
  }
  useEffect(() => {
      getUSer()
    },[]);

  // Profile form data
  const [formData, setFormData] = useState<{
    name: string
    email: string
    dob: string
    cgpa: string
  }>({
    name: "",
    email: "",
    dob: "", // Updated to match the format for date input
    cgpa: "", // Fixed to be a proper CGPA value
  })

  // Security settings state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true)
  const [passwordData, setPasswordData] = useState<{
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Hide notification after 3 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showNotification])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Clear errors when changing tabs
    setErrors({
      profile: {},
      security: {},
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: "",
      },
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [name]: "",
      },
    }))
  }

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
  }

  const validateProfileForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    // Update errors state
    setErrors((prev) => ({
      ...prev,
      profile: newErrors,
    }))

    // Return true if no errors
    return Object.keys(newErrors).length === 0
  }

  const validateSecurityForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    // Check if password fields are filled
    if (!passwordData.currentPassword.trim()) newErrors.currentPassword = "Current password is required"
    if (!passwordData.newPassword.trim()) newErrors.newPassword = "New password is required"
    if (!passwordData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required"

    // Check if passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Update errors state
    setErrors((prev) => ({
      ...prev,
      security: newErrors,
    }))

    // Return true if no errors
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = false

    if (activeTab === "edit-profile") {
      isValid = validateProfileForm()
      if (isValid) {
        console.log("Profile form submitted:", formData)
        const user = await authService.getUser()
        const role = authService.getRole();
        // Update the user profile
        if(role === "Admin"){
          await axiosInstance.put(`/admin/${user._id}`, {
            name: formData.name ? formData.name : user.name,
            email: formData.email? formData.email : user.email,
            dob: formData.dob ? formData.dob : user.dob,
            cgpa: formData.cgpa ? formData.cgpa : user.cgpa,
          })
        }
        else{
          await axiosInstance.put(`/user/${user._id}`, {
            name: formData.name ? formData.name : user.name,
            email: formData.email? formData.email : user.email,
            dob: formData.dob ? formData.dob : user.dob,
            cgpa: formData.cgpa ? formData.cgpa : user.cgpa,
          })
        }
        toast.success("Profile updated successfully")
      }
    } else if (activeTab === "security") {
      isValid = validateSecurityForm()
      if (isValid) {
        console.log("Security settings submitted:", {
          twoFactorEnabled,
          passwordData,
        })
      }
    }

    // Only show notification if validation passes
    if (isValid) {
      setShowNotification(true)
    }
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Store the file name or path in formData
      uploadImage(file).then(async (url:string) => {
        
        const reader = new FileReader()
        reader.onloadend = () => {
          setProfileImage(reader.result as string)
        }
        
        reader.readAsDataURL(file)
        const user = await authService.getUser()
        const role = authService.getRole();
        // Update the profile picture URL
        if(role === "Admin"){
           await axiosInstance.put(`/admin/${user._id}`, {
            picture: url,
          })
        }
        else if(role === "Student"){
          await axiosInstance.put(`/user/${user._id}`, {
            picture: url,
          })
        }
        toast.success("Profile picture updated successfully")
        // Clear any errors
        setErrors((prevErrors) => ({ ...prevErrors, profilePicture: "" }))
    }).catch((error) => {
      console.log("Error uploading image:", error.message)
      setErrors((prevErrors) => ({ ...prevErrors, profilePicture: error.message }))
    })
    }
    if (file) {
    }
  }
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
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

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {activeTab === "edit-profile" && (
          <>
            {/* Profile Picture */}
            <div className="flex mb-8">
              <div className="relative">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
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
                  placeholder={user?.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.profile.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                {errors.profile.name && <p className="mt-1 text-sm text-red-500">{errors.profile.name}</p>}
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
                  placeholder={user?.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.profile.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                {errors.profile.email && <p className="mt-1 text-sm text-red-500">{errors.profile.email}</p>}
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
                    placeholder={user?.dob}
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.profile.dob ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                  />
                </div>
                {errors.profile.dob && <p className="mt-1 text-sm text-red-500">{errors.profile.dob}</p>}
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
                  placeholder={user?.cgpa}
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.profile.cgpa ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                {errors.profile.cgpa && <p className="mt-1 text-sm text-red-500">{errors.profile.cgpa}</p>}
              </div>
            </div>
          </>
        )}

        {activeTab === "security" && (
          <>
            {/* Two-factor Authentication */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Two-factor Authentication</h2>
              <div className="flex items-center">
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                    twoFactorEnabled ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={handleToggleTwoFactor}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                      twoFactorEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="ml-3 text-sm text-gray-600">Enable or disable two factor authentication</span>
              </div>
            </div>

            {/* Change Password */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Change Password</h2>

              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border ${errors.security.currentPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="••••••••••"
                />
                {errors.security.currentPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.security.currentPassword}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border ${errors.security.newPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="••••••••••"
                />
                {errors.security.newPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.security.newPassword}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border ${errors.security.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="••••••••••"
                />
                {errors.security.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.security.confirmPassword}</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-between">
          <button
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              authService.logout()
              navigate("/login")
            }}
          >
            Logout
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg transition-opacity duration-300">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Changes Saved</span>
        </div>
      )}
    </div>
  )
}

export default Settings