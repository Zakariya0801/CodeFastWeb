"use client"

import { useState } from "react"
import { FaComments, FaLightbulb } from "react-icons/fa"
import TopBar from "../Shared/Topbar"
import authService from "../Auth/authService"
import { useEffect } from "react"
import axiosInstance from "../../Utils/axiosInstance"
import { toast } from "react-toastify"
import { useGlobalContext } from "../Auth/GlobalProvider"

const Feedback = () => {
  const { isDarkMode } = useGlobalContext()
  const [activeTab, setActiveTab] = useState<"feedback" | "suggestions">("feedback")
  const [performanceScore, setPerformanceScore] = useState<number>(0)
  const [suggestionType, setSuggestionType] = useState<string>("")
  const [suggestionDescription, setSuggestionDescription] = useState<string>("")
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [user, setUser] = useState<any>()

  const getUser = async () => {
    setUser(await authService.getUser())
  }

  const name = user?.name || "User"

  useEffect(() => {
    setPerformanceScore(user?.sPerformance || 0)
  }, [user])

  useEffect(() => {
    getUser()
  }, [])

  // Function to get feedback based on performance score
  const getFeedbackContent = (score: number) => {
    if (score === 0) {
      return {
        subject: "Performance Feedback – CodeFAST Participation",
        content: `Dear ${name},

We appreciate your involvement in the CodeFAST platform. However, based on the current evaluation, your performance has been recorded as 0 on a scale of 4.

This indicates that there has been no noticeable activity or engagement with the platform's resources. We strongly encourage you to explore the learning materials, attempt coding challenges, and actively participate in courses and quizzes to begin your journey towards excellence.

Remember, every expert was once a beginner. We are confident that with dedication and consistency, your progress will be evident in the next evaluation cycle.

Warm regards,
CodeFAST Evaluation Team`,
      }
    } else if (score > 0 && score <= 1) {
      return {
        subject: "Performance Feedback – Initial Progress Observed",
        content: `Dear ${name},

Thank you for being a part of the CodeFAST platform. Your performance rating falls between 0 and 1, which indicates the beginning of your learning journey.

While the current progress is modest, your initial participation has been noted. We highly recommend increasing your engagement by completing tutorials, taking quizzes, and solving beginner-level challenges. Continuous effort will surely reflect in your future assessments.

We are here to support your growth at every step.

Sincerely,
CodeFAST Evaluation Team`,
      }
    } else if (score > 1 && score <= 2) {
      return {
        subject: "Performance Feedback – Steady Efforts Noted",
        content: `Dear ${name},

We hope this message finds you well. Based on our latest performance review, your current rating stands between 1 and 2, signifying steady and consistent effort on the CodeFAST platform.

You have demonstrated a growing understanding of the platform's offerings, and we commend your perseverance. To further enhance your skills, we encourage you to take on intermediate-level challenges and deepen your conceptual understanding through our available learning tracks.

Keep up the dedication—your hard work is paving the way toward excellence.

With best regards,
CodeFAST Evaluation Team`,
      }
    } else if (score > 2 && score <= 3) {
      return {
        subject: "Performance Feedback – Positive Growth Reflected",
        content: `Dear ${name},

We are pleased to acknowledge your consistent performance on the CodeFAST platform, where your current rating lies between 2 and 3.

Your active participation and ability to grasp new concepts are commendable. You have shown significant growth, and we encourage you to continue exploring advanced topics, engaging in peer discussions, and challenging yourself with higher difficulty modules.

Your upward trajectory is clearly visible. Keep up the great work!

Respectfully,
CodeFAST Evaluation Team`,
      }
    } else if (score > 3 && score < 4) {
      return {
        subject: "Performance Feedback – Commendable Proficiency Achieved",
        content: `Dear ${name},

Congratulations on maintaining an impressive performance score ranging between 3 and 4 on the CodeFAST platform.

Your consistent dedication, problem-solving ability, and commitment to learning have not gone unnoticed. You are emerging as a proficient and reliable learner in the CodeFAST community. We encourage you to mentor others, participate in contests, and continue striving for mastery.

Your performance sets a strong example for your peers.

With sincere appreciation,
CodeFAST Evaluation Team`,
      }
    } else {
      return {
        subject: "Performance Feedback – Outstanding Excellence Demonstrated",
        content: `Dear ${name},

It is with great pleasure that we acknowledge your perfect rating of 4 out of 4 on the CodeFAST platform.

You have exemplified exceptional skill, discipline, and dedication to learning. Your outstanding contributions to quizzes, coding challenges, and overall participation mark you as a top performer and a valuable member of the CodeFAST community.

We applaud your excellence and look forward to your continued success and leadership in the field.

With highest regards,
CodeFAST Evaluation Team`,
      }
    }
  }

  const handleSubmitSuggestion = async () => {
    // Send the suggestion to your backend using the POST route
    try {
      const response = await axiosInstance.post("/suggestion/", {
        email: user?.email,
        type: suggestionType,
        description: suggestionDescription,
      })

      if (response.status === 201) {
        setSubmitSuccess(true)
        setSuggestionType("")
        setSuggestionDescription("")
        console.log("Suggestion submitted successfully")
        toast.success("Your suggestion has been submitted successfully")
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error)
    }
  }

  const feedback = getFeedbackContent(performanceScore)

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-200 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <TopBar title="Feedback" />
      <div className="mt-10 mx-auto max-w-5xl">
        {/* Tabs */}
        <div className={`flex mb-6 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <button
            className={`flex items-center px-6 py-3 font-medium text-sm ${
              activeTab === "feedback"
                ? isDarkMode
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-blue-600 border-b-2 border-blue-600"
                : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            <FaComments className="mr-2" />
            Student Feedback
          </button>
          <button
            className={`flex items-center px-6 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "suggestions"
                ? isDarkMode
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-blue-600 border-b-2 border-blue-600"
                : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("suggestions")}
          >
            <FaLightbulb className="mr-2" />
            Suggestions/Improvements
          </button>
        </div>

        {/* Content */}
        <div
          className={`rounded-lg shadow-sm p-6 border ${
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          {activeTab === "feedback" ? (
            <div>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Your Performance Feedback
                </h2>
                <div className="flex items-center mb-4">
                  <div className={`w-full rounded-full h-2.5 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(performanceScore / 4) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`ml-3 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {performanceScore.toFixed(1)}/4
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>0</span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>1</span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>2</span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>3</span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>4</span>
                </div>
              </div>

              <div
                className={`p-6 rounded-lg border ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  {feedback.subject}
                </h3>
                <div className={`whitespace-pre-line ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {feedback.content}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Submit Your Suggestions
              </h2>

              {submitSuccess && (
                <div
                  className={`mb-6 p-4 border-l-4 rounded-lg shadow-lg ${
                    isDarkMode
                      ? "bg-green-900/30 border-green-500 text-green-300"
                      : "bg-green-50 border-green-500 text-green-700"
                  } font-medium`}
                >
                  <span>Your suggestion has been submitted successfully. Thank you for your valuable feedback!</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="suggestionType"
                    className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Type of Suggestion
                  </label>
                  <select
                    id="suggestionType"
                    value={suggestionType}
                    onChange={(e) => setSuggestionType(e.target.value)}
                    className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "border border-gray-300 text-gray-900"
                    }`}
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="UI/UX">UI/UX Improvement</option>
                    <option value="Content">Course Content</option>
                    <option value="Feature">New Feature</option>
                    <option value="Bug">Bug Report</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={suggestionDescription}
                    onChange={(e) => setSuggestionDescription(e.target.value)}
                    rows={6}
                    className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "border border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="Please provide details about your suggestion or improvement idea..."
                    required
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmitSuggestion}
                  disabled={!suggestionType || !suggestionDescription}
                  className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Submit Suggestion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Feedback
