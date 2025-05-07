"use client"

import { useState, useEffect } from "react"
import TopBar from "../Shared/Topbar"
import {
  FaBriefcase,
  FaBuilding,
  FaCheckCircle,
  FaClipboardCheck,
  FaFileAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
  FaTimesCircle,
  FaUserTie,
  FaSearch,
  FaSpinner,
} from "react-icons/fa"
import { useGlobalContext } from "../Auth/GlobalProvider"
import axiosInstance from "../../Utils/axiosInstance"
import { toast } from "react-toastify";

// Tab type definition
type TabType = "available" | "applied" | "offered" | "ongoing"

// Job type definition based on the actual model
interface Job {
  _id: string
  title: string
  description: string
  location: string
  status: string // 'OPEN' or 'CLOSED'
  salary: number
  jobId: any
  industry: {
    _id: string
    name: string
  }
  createdAt?: string
  updatedAt?: string
}

// StudentIndustry type definition based on the actual model
interface StudentIndustry {
  _id: string
  studentId: string
  industryId: string
  jobId: any
  request: number // -1 = Not applied, 0 = Student Applied, 1 = Industry Approached Student
  status: number // 1 = Accepted, 0 = Pending, -1 = Rejected
  job: Job
  createdAt?: string
  updatedAt?: string
}

// Combined job data for display
interface JobDisplay {
  _id: string
  studentIndustryId?: string
  title: string
  description: string
  location: string
  status: string
  salary: number | string
  industry: {
    _id: string
    name: string
  }
  studentId?: string
  jobId?: any
  request?: number
  applicationStatus?: number
}

// Stats interface
interface JobStats {
  applied: number
  offered: number
  ongoing: number
}

function JobInternship() {
  // Get dark mode state
  const { isDarkMode } = useGlobalContext()

  // State for active tab
  const [activeTab, setActiveTab] = useState<TabType>("available")

  // State to track if mobile view is active
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768)

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for jobs data
  const [availableJobs, setAvailableJobs] = useState<JobDisplay[]>([])
  const [appliedJobs, setAppliedJobs] = useState<JobDisplay[]>([])
  const [offeredJobs, setOfferedJobs] = useState<JobDisplay[]>([])
  const [ongoingJobs, setOngoingJobs] = useState<JobDisplay[]>([])

  // Loading states
  const [isLoading, setIsLoading] = useState(true)

  // Stats
  const [jobStats, setJobStats] = useState<JobStats>({
    applied: 0,
    offered: 0,
    ongoing: 0,
  })

  // Tabs configuration with icons
  const tabs = [
    { id: "available", label: "Available Positions", icon: <FaBriefcase /> },
    { id: "applied", label: "Applied Positions", icon: <FaPaperPlane /> },
    { id: "offered", label: "Offered Positions", icon: <FaFileAlt /> },
    { id: "ongoing", label: "Ongoing Jobs/Internships", icon: <FaUserTie /> },
  ]

  // Update isMobileView when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch jobs data
  useEffect(() => {
    fetchAllJobData()
  }, [])

  

  const [_, setJobs] = useState<Job[]>([]);

  // Sync jobs initially
  useEffect(() => {
    const syncAndFetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/student-job-sync/sync");
        setJobs(response.data.inserted);
        console.log("Jobs synced and fetched successfully:", response.data.inserted);
      } catch (err) {
        console.error("Error loading jobs:", err);
      }
    };
    syncAndFetchJobs();
  }, []);

  // Fetch all job data
  const fetchAllJobData = async () => {
    setIsLoading(true)
    try {
      // Fetch all job types in parallel
      // const [availableRes, 
      //   appliedRes, 
      //   offeredRes, 
      //   ongoingRes
      // ] = await Promise.all([
      //   axiosInstance.get("/student-job-sync/available"),
      //   axiosInstance.get("/student-job-sync/applied"),
      //   axiosInstance.get("/student-job-sync/offered"),
      //   axiosInstance.get("/student-job-sync/ongoing"),
      // ])
      const availableRes = await axiosInstance.get("/student-job-sync/available")
      console.log("I am here 2");
      const appliedRes = await axiosInstance.get("/student-job-sync/applied")
      console.log("I am here 3");
      const offeredRes = await axiosInstance.get("/student-job-sync/offered")
      console.log("I am here 4");
      const ongoingRes = await axiosInstance.get("/student-job-sync/ongoing")
      console.log("I am here 5");
      console.log("I am here");
      // Process available jobs
      console.log(availableRes.data)
      const availableJobsData = availableRes.data.jobs || []
      const formattedAvailableJobs = availableJobsData.map((job: Job) => ({
        ...job,
        salary: `Rs. ${job.jobId.salary}k`,
      }))
      setAvailableJobs(formattedAvailableJobs)
      
      // Process applied jobs
      console.log(appliedRes.data)
      const appliedJobsData = appliedRes.data.jobs || []
      const formattedAppliedJobs = appliedJobsData.map((job: Job) => ({
        ...job,
        salary: `Rs. ${job.jobId.salary}k`,
      }))
      setAppliedJobs(formattedAppliedJobs)

      // Process offered jobs
      const offeredJobsData = offeredRes.data.jobs || []
      const formattedOfferedJobs = offeredJobsData.map((job: Job) => ({
        ...job,
        salary: `Rs. ${job.jobId.salary}k`,
      }))
      setOfferedJobs(formattedOfferedJobs)

      // Process ongoing jobs
      const ongoingJobsData = ongoingRes.data.jobs || []
      const formattedOngoingJobs = ongoingJobsData.map((item: StudentIndustry) => ({
        _id: item._id,
        studentIndustryId: item._id,
        title: item.job.title,
        description: item.job.description,
        location: item.job.location,
        status: item.job.status,
        salary: `Rs. ${item.job.jobId.salary}k`,
        industry: item.job.industry,
        studentId: item.studentId,
        jobId: item.jobId,
        request: item.request,
        applicationStatus: item.status,
      }))
      setOngoingJobs(formattedOngoingJobs)

      // Update stats
      setJobStats({
        applied: formattedAppliedJobs.length,
        offered: formattedOfferedJobs.length,
        ongoing: formattedOngoingJobs.length,
      })
    } catch (error) {
      console.error("Error fetching job data:", error)
      toast.error("Failed to load job data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Apply for a job
  const handleApplyJob = async (jobId: string) => {
    try {
      await axiosInstance.put(`/student-job-sync/apply/${jobId}`)
      toast.success("Successfully applied for the job!")
      fetchAllJobData() // Refresh data
    } catch (error) {
      console.error("Error applying for job:", error)
      toast.error("Failed to apply for the job. Please try again.")
    }
  }

  // Accept job offer
  const handleAcceptOffer = async (studentId: string, jobId: string) => {
    try {
      await axiosInstance.put(`/student-job/${studentId}/${jobId}/status`, { status: 1 })
      toast.success("Job offer accepted!")
      fetchAllJobData() // Refresh data
    } catch (error) {
      console.error("Error accepting job offer:", error)
      toast.error("Failed to accept the job offer. Please try again.")
    }
  }

  // Reject job offer
  const handleRejectOffer = async (studentId: string, jobId: string) => {
    try {
      await axiosInstance.put(`/student-job/${studentId}/${jobId}/status`, { status: -1 })
      toast.success("Job offer rejected!")
      fetchAllJobData() // Refresh data
    } catch (error) {
      console.error("Error rejecting job offer:", error)
      toast.error("Failed to reject the job offer. Please try again.")
    }
  }

  // End ongoing job
  const handleEndJob = async (studentId: string, jobId: string) => {
    try {
      // Delete the student-industry relationship to end the job
      await axiosInstance.delete(`/student-job/${studentId}/${jobId}`)
      toast.success("Job marked as completed!")
      fetchAllJobData() // Refresh data
    } catch (error) {
      console.error("Error ending job:", error)
      toast.error("Failed to end the job. Please try again.")
    }
  }

  // Get current jobs based on active tab
  const getCurrentJobs = () => {
    switch (activeTab) {
      case "available":
        return availableJobs
      case "applied":
        return appliedJobs
      case "offered":
        return offeredJobs
      case "ongoing":
        return ongoingJobs
      default:
        return []
    }
  }

  // Filter jobs based on search query
  const filteredJobs = getCurrentJobs().filter((job) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(query) ||
      job.industry.name.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    )
  })

  // Get job status display text
  const getJobStatusDisplay = (status: string) => {
    return status === "OPEN" ? "Open" : "Closed"
  }

  // Get application status display text
  const getApplicationStatusDisplay = (status?: number) => {
    if (status === undefined) return "Unknown"
    switch (status) {
      case 1:
        return "Accepted"
      case 0:
        return "Pending"
      case -1:
        return "Rejected"
      default:
        return "Unknown"
    }
  }

  // Render action button based on tab
  const renderActionButton = (tab: TabType, job: JobDisplay) => {
    switch (tab) {
      case "available":
        return (
          <button
            onClick={() => handleApplyJob(job.jobId._id)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-md transition-colors flex items-center gap-1 sm:gap-2 ${
              isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            disabled={job.status === "CLOSED"}
          >
            <FaClipboardCheck className="text-white" />
            Apply
          </button>
        )
      case "applied":
        return (
          <span
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-md flex items-center gap-1 sm:gap-2 ${
              isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <FaClipboardCheck className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
            <span className="hidden sm:inline">Waiting for Response</span>
            <span className="sm:hidden">Waiting</span>
          </span>
        )
      case "offered":
        return (
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => job.studentId && job.jobId && handleAcceptOffer(job.studentId, job.jobId)}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-green-800 hover:bg-green-700 text-green-300"
                  : "bg-green-100 hover:bg-green-200 text-green-600"
              }`}
            >
              <FaCheckCircle size={isMobileView ? 16 : 20} />
            </button>
            <button
              onClick={() => job.studentId && job.jobId && handleRejectOffer(job.studentId, job.jobId)}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                isDarkMode ? "bg-red-800 hover:bg-red-700 text-red-300" : "bg-red-100 hover:bg-red-200 text-red-600"
              }`}
            >
              <FaTimesCircle size={isMobileView ? 16 : 20} />
            </button>
          </div>
        )
      case "ongoing":
        return (
          <button
            onClick={() => job.studentId && job.jobId && handleEndJob(job.studentId, job.jobId)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-md transition-colors flex items-center gap-1 sm:gap-2 ${
              isDarkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700"
            } text-white`}
          >
            <FaTimesCircle className="text-white" />
            <span className="hidden sm:inline">End Position</span>
            <span className="sm:hidden">End</span>
          </button>
        )
      default:
        return null
    }
  }

  // Render mobile card view for each job
  const renderMobileJobCard = (job: JobDisplay) => {
    console.log("job = ", job)
    return (
      <div
        key={job._id}
        className={`p-4 rounded-lg border mb-4 shadow-sm transition-colors ${
          isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium">{job.title}</h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              job.status === "OPEN"
                ? isDarkMode
                  ? "bg-green-800 text-green-200"
                  : "bg-green-100 text-green-800"
                : isDarkMode
                  ? "bg-red-800 text-red-200"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {getJobStatusDisplay(job.status)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <FaBuilding className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{job.jobId.industry.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FaMoneyBillWave className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>PKR {job.salary}</span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <FaFileAlt className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1 flex-shrink-0`} />
            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{job.description}</span>
          </div>

          {activeTab !== "available" && job.applicationStatus !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <FaClipboardCheck className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
              <span
                className={`${
                  job.applicationStatus === 1
                    ? isDarkMode
                      ? "text-green-400"
                      : "text-green-600"
                    : job.applicationStatus === -1
                      ? isDarkMode
                        ? "text-red-400"
                        : "text-red-600"
                      : isDarkMode
                        ? "text-yellow-400"
                        : "text-yellow-600"
                }`}
              >
                {getApplicationStatusDisplay(job.applicationStatus)}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end">{renderActionButton(activeTab, job)}</div>
      </div>
    )
  }

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <FaSpinner className={`animate-spin h-8 w-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
    </div>
  )

  // Empty state component
  const EmptyState = () => (
    <div className={`text-center py-8 sm:py-12 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
      <FaBriefcase className={`mx-auto h-10 w-10 sm:h-12 sm:w-12 ${isDarkMode ? "text-gray-600" : "text-gray-300"}`} />
      <h3 className={`mt-2 text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
        No positions found
      </h3>
      <p className="mt-1 text-sm">No {activeTab} positions are currently available.</p>
    </div>
  )

  return (
    <div
      className={`min-h-screen p-3 sm:p-4 transition-colors duration-200 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <TopBar title="Job/Internship" />

      <div className="mt-6 sm:mt-10 mx-auto max-w-7xl">
        {/* Search Bar */}
        <div className={`mb-6 relative ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
          </div>
          <input
            type="text"
            className={`w-full p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                : "bg-white border border-gray-300 placeholder-gray-500"
            }`}
            placeholder="Search positions by title, industry, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div
          className={`rounded-lg shadow-sm mb-4 sm:mb-6 overflow-hidden transition-colors ${
            isDarkMode ? "bg-gray-900 border border-gray-700" : "bg-white"
          }`}
        >
          <div className={`flex flex-wrap border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? "text-blue-400 border-b-2 border-blue-400 bg-gray-800"
                      : "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                } ${window.innerWidth < 640 ? "flex-1 justify-center" : ""}`}
              >
                <span className="text-base sm:text-lg">{tab.icon}</span>
                <span className={window.innerWidth < 480 ? "hidden" : ""}>{tab.label}</span>
                {window.innerWidth < 480 && <span>{tab.label.split(" ")[0]}</span>}
              </button>
            ))}
          </div>

          {/* Table/Cards Container */}
          <div className="p-3 sm:p-6">
            {isLoading ? (
              <LoadingSpinner />
            ) : filteredJobs.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="md:hidden">{filteredJobs.map((job) => renderMobileJobCard(job))}</div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FaBuilding className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                            Industry
                          </div>
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FaBriefcase className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                            Title
                          </div>
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FaFileAlt className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                            Description
                          </div>
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                            Location
                          </div>
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FaClipboardCheck className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                            Status
                          </div>
                        </th>
                        {activeTab !== "available" && (
                          <th
                            className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                              isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <FaClipboardCheck className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                              Application
                            </div>
                          </th>
                        )}
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FaMoneyBillWave className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                            Salary (PKR)
                          </div>
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${
                            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                          }`}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                      {filteredJobs.map((job) => (
                        <tr
                          key={job._id}
                          className={`transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {job.jobId.industry.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {job.jobId.title}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div
                              className={`text-sm max-w-xs truncate ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                            >
                              {job.jobId.description}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                              {job.jobId.location}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                job.jobId.status === "OPEN"
                                  ? isDarkMode
                                    ? "bg-green-800 text-green-200"
                                    : "bg-green-100 text-green-800"
                                  : isDarkMode
                                    ? "bg-red-800 text-red-200"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {getJobStatusDisplay(job.jobId.status)}
                            </span>
                          </td>
                          {activeTab !== "available" && (
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  job.applicationStatus === 1
                                    ? isDarkMode
                                      ? "bg-green-800 text-green-200"
                                      : "bg-green-100 text-green-800"
                                    : job.applicationStatus === -1
                                      ? isDarkMode
                                        ? "bg-red-800 text-red-200"
                                        : "bg-red-100 text-red-800"
                                      : isDarkMode
                                        ? "bg-yellow-800 text-yellow-200"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {getApplicationStatusDisplay(job.applicationStatus)}
                              </span>
                            </td>
                          )}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {job.salary}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">{renderActionButton(activeTab, job)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div
            className={`rounded-lg p-4 sm:p-6 shadow-sm col-span-1 transition-colors ${
              isDarkMode ? "bg-gray-900 border border-gray-700" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <FaBriefcase className="text-blue-600" size={isMobileView ? 16 : 20} />
              </div>
              <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Job Statistics
              </h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div
                className={`flex justify-between items-center p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <span className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Applied</span>
                <span className="font-medium">{jobStats.applied}</span>
              </div>
              <div
                className={`flex justify-between items-center p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <span className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Offered</span>
                <span className="font-medium">{jobStats.offered}</span>
              </div>
              <div
                className={`flex justify-between items-center p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <span className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Ongoing</span>
                <span className="font-medium">{jobStats.ongoing}</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg p-4 sm:p-6 shadow-sm col-span-1 md:col-span-2 transition-colors ${
              isDarkMode ? "bg-gray-900 border border-gray-700" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <FaUserTie className="text-blue-600" size={isMobileView ? 16 : 20} />
              </div>
              <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Career Insights
              </h3>
            </div>
            <div
              className={`p-3 sm:p-4 rounded-lg border ${
                isDarkMode ? "bg-blue-900/20 border-blue-900/30" : "bg-blue-50 border-blue-100"
              }`}
            >
              <h4 className={`font-medium mb-2 text-sm sm:text-base ${isDarkMode ? "text-blue-300" : "text-blue-800"}`}>
                Recommended Next Steps
              </h4>
              <ul className={`space-y-2 text-xs sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" size={isMobileView ? 14 : 16} />
                  <span>Update your resume with recent projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" size={isMobileView ? 14 : 16} />
                  <span>Complete your LinkedIn profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" size={isMobileView ? 14 : 16} />
                  <span>Practice technical interviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobInternship