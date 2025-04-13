"use client"

import type React from "react"
import { useState } from "react"
import { PlusCircle, X, ArrowLeft, Save, CheckCircle } from "lucide-react"
import axiosInstance from "../../Utils/axiosInstance"
import authService from "../Auth/authService"
import { toast } from "react-toastify"

// Define types for our data structures
type Option = {
  id: string
  text: string
}

type Question = {
  id: string
  question: string
  options: Option[]
  correctOption: string
}

type Quiz = {
  id: string
  title: string
  questions: Question[]
}

type CourseData = {
  name: string
  subtitle: string
  description: string
  category: string
  quizzes: Quiz[]
}

const categories = [
  "Computer Science",
  "Information Technology",
  "Data Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Business",
  "Economics",
  "Psychology",
  "History",
  "Literature",
  "Art",
  "Music",
]

interface Iadd{
    setActiveFilter: any;
}

export default function AddCourse({setActiveFilter}: Iadd) {
  // Initialize course data state
  const [courseData, setCourseData] = useState<CourseData>({
    name: "",
    subtitle: "",
    description: "",
    category: "Computer Science",
    quizzes: [],
  })

  // State for the current quiz being edited
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)

  // State for the current question being edited
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  // State to track which step we're on
  const [step, setStep] = useState<"course-details" | "quizzes" | "questions">("course-details")

  // Handle course data changes
  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add a new quiz
  const addQuiz = () => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: `Quiz ${courseData.quizzes.length + 1}`,
      questions: [],
    }

    setCourseData((prev) => ({
      ...prev,
      quizzes: [...prev.quizzes, newQuiz],
    }))

    setCurrentQuiz(newQuiz)
    setStep("questions")
  }

  // Update quiz title
  const updateQuizTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentQuiz) return

    const updatedQuiz = { ...currentQuiz, title: e.target.value }
    setCurrentQuiz(updatedQuiz)

    setCourseData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)),
    }))
  }

  // Add a new question to the current quiz
  const addQuestion = () => {
    if (!currentQuiz) return

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: [
        { id: "1", text: "" },
        { id: "2", text: "" },
        { id: "3", text: "" },
        { id: "4", text: "" },
      ],
      correctOption: "1",
    }

    const updatedQuiz = {
      ...currentQuiz,
      questions: [...currentQuiz.questions, newQuestion],
    }

    setCurrentQuiz(updatedQuiz)
    setCurrentQuestion(newQuestion)

    setCourseData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)),
    }))
  }

  // Update question statement
  const updateQuestionStatement = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!currentQuestion || !currentQuiz) return

    const updatedQuestion = { ...currentQuestion, question: e.target.value }
    setCurrentQuestion(updatedQuestion)

    const updatedQuiz = {
      ...currentQuiz,
      questions: currentQuiz.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    }

    setCurrentQuiz(updatedQuiz)

    setCourseData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)),
    }))
  }

  // Update option text
  const updateOptionText = (optionId: string, text: string) => {
    if (!currentQuestion || !currentQuiz) return

    const updatedQuestion = {
      ...currentQuestion,
      options: currentQuestion.options.map((opt) => (opt.id === optionId ? { ...opt, text } : opt)),
    }

    setCurrentQuestion(updatedQuestion)

    const updatedQuiz = {
      ...currentQuiz,
      questions: currentQuiz.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    }

    setCurrentQuiz(updatedQuiz)

    setCourseData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)),
    }))
  }

  // Set correct option
  const setCorrectOption = (optionId: string) => {
    if (!currentQuestion || !currentQuiz) return

    const updatedQuestion = { ...currentQuestion, correctOption: optionId }
    setCurrentQuestion(updatedQuestion)

    const updatedQuiz = {
      ...currentQuiz,
      questions: currentQuiz.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    }

    setCurrentQuiz(updatedQuiz)

    setCourseData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)),
    }))
  }

  // Delete a quiz
  const deleteQuiz = (quizId: string) => {
    setCourseData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.filter((q) => q.id !== quizId),
    }))

    if (currentQuiz?.id === quizId) {
      setCurrentQuiz(null)
      setCurrentQuestion(null)
      setStep("quizzes")
    }
  }

  // Delete a question
  const deleteQuestion = (questionId: string) => {
    if (!currentQuiz) return

    const updatedQuiz = {
      ...currentQuiz,
      questions: currentQuiz.questions.filter((q) => q.id !== questionId),
    }

    setCurrentQuiz(updatedQuiz)

    if (currentQuestion?.id === questionId) {
      setCurrentQuestion(null)
    }

    setCourseData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)),
    }))
  }

  // Select a quiz to edit
  const selectQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz)
    setCurrentQuestion(null)
    setStep("questions")
  }

  // Select a question to edit
  const selectQuestion = (question: Question) => {
    setCurrentQuestion(question)
  }

  // Go back to previous step
  const goBack = () => {
    if (step === "questions") {
      setStep("quizzes")
      setCurrentQuiz(null)
      setCurrentQuestion(null)
    } else if (step === "quizzes") {
      setStep("course-details")
    }
  }

  // Go to next step
  const goNext = () => {
    if (step === "course-details") {
      setStep("quizzes")
    }
  }
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Submitting course data:", courseData)
      // Here you would typically send the data to your backend
      try{
        const cours = await axiosInstance.post("/course", {
            name: courseData.name,
            subtitle: courseData.subtitle,
            description: courseData.description,
            category: courseData.category,
        })
        console.log("Course created", cours.data.course)
        for(const quiz of courseData.quizzes){
            await axiosInstance.post("/quizzes", {
                courseId: cours.data.course._id, 
                title: quiz.title, 
                totalMarks: 10, 
                Questions: quiz.questions.map((q) => {
                    // store options as string[] having only text

                    const NewOptions = q.options.map((opt) => {
                        return opt.text
                    }); 
                    return {
                        question: q.question,
                        options: NewOptions,
                        correctOption: q.correctOption
                    }
                })
            })
        }
        toast.success("Course created successfully!")
    }catch(err){
        console.log("Error creating course", err)
    }
    // Reset form or redirect
    setActiveFilter("enrolled")
  }

  // Check if we can proceed to the next step
  const canProceedToCourseDetails = () => {
    return courseData.name && courseData.subtitle && courseData.description && courseData.category
  }

  // Check if a quiz has 5 complete questions
  const isQuizComplete = (quiz: Quiz) => {
    // if (quiz.questions.length !== 5) return false

    return quiz.questions.every((q) => q.question && q.options.every((opt) => opt.text) && q.correctOption)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveFilter("enrolled")}
            className={`flex items-center text-gray-600 hover:text-gray-900 ${step !== "course-details" ? "invisible" : ""}`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button
            onClick={goBack}
            className={`flex items-center text-gray-600 hover:text-gray-900 ${step === "course-details" ? "invisible" : ""}`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-center flex-grow">Add New Course</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Progress indicator */}
          <div className="flex items-center mb-8">
            <div
              className={`flex items-center ${step === "course-details" ? "text-purple-600 font-semibold" : "text-gray-500"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "course-details" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              Course Details
            </div>
            <div className="w-16 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${step !== "course-details" ? "bg-purple-600" : "bg-gray-200"}`}></div>
            </div>
            <div
              className={`flex items-center ${step === "quizzes" ? "text-purple-600 font-semibold" : "text-gray-500"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "quizzes" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              Quizzes
            </div>
            <div className="w-16 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${step === "questions" ? "bg-purple-600" : "bg-gray-200"}`}></div>
            </div>
            <div
              className={`flex items-center ${step === "questions" ? "text-purple-600 font-semibold" : "text-gray-500"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "questions" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              Questions
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Course Details */}
            {step === "course-details" && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={courseData.name}
                    onChange={handleCourseChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle*
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={courseData.subtitle}
                    onChange={handleCourseChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={courseData.category}
                    onChange={handleCourseChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={courseData.description}
                    onChange={handleCourseChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canProceedToCourseDetails()}
                    className={`px-6 py-2 rounded-md text-white font-medium ${
                      canProceedToCourseDetails()
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next: Add Quizzes
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Quizzes */}
            {step === "quizzes" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Add Quizzes</h2>

                <div className="space-y-4 mb-6">
                  {courseData.quizzes.length > 0 ? (
                    courseData.quizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <div className="text-lg font-medium">{quiz.title}</div>
                            <div className="text-sm text-gray-500">
                              {quiz.questions.length} questions
                              {isQuizComplete(quiz) && (
                                <span className="ml-2 text-green-500 flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-1" /> Complete
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => selectQuiz(quiz)}
                            className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteQuiz(quiz.id)}
                            className="p-1 text-gray-500 hover:text-red-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No quizzes added yet. Click the button below to add your first quiz.
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={addQuiz}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Quiz
                  </button>

                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-md text-white font-medium ${
                      courseData.quizzes.length > 0 && courseData.quizzes.every(isQuizComplete)
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={courseData.quizzes.length === 0 || !courseData.quizzes.every(isQuizComplete)}
                  >
                    <Save className="w-5 h-5 mr-2 inline" />
                    Save Course
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Questions */}
            {step === "questions" && currentQuiz && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    <input
                      type="text"
                      value={currentQuiz.title}
                      onChange={updateQuizTitle}
                      className="px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                    />
                  </h2>
                  <div className="text-sm text-gray-500">{currentQuiz.questions.length}/5 questions</div>
                </div>

                {currentQuiz.questions.length > 0 ? (
                  <div className="space-y-6 mb-8">
                    {currentQuiz.questions.map((question, qIndex) => (
                      <div
                        key={question.id}
                        className={`p-4 border rounded-md ${
                          currentQuestion?.id === question.id ? "border-purple-500 bg-purple-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">Question {qIndex + 1}</h3>
                          <button
                            type="button"
                            onClick={() => deleteQuestion(question.id)}
                            className="p-1 text-gray-500 hover:text-red-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {currentQuestion?.id === question.id ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Question Statement</label>
                              <textarea
                                value={currentQuestion.question}
                                onChange={updateQuestionStatement}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your question here..."
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Options (select the correct answer)
                              </label>
                              <div className="space-y-2">
                                {currentQuestion.options.map((option) => (
                                  <div key={option.id} className="flex items-center">
                                    <input
                                      type="radio"
                                      id={`option-${option.id}`}
                                      name={`correct-option-${currentQuestion.id}`}
                                      checked={currentQuestion.correctOption === option.id}
                                      onChange={() => setCorrectOption(option.id)}
                                      className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <input
                                      type="text"
                                      value={option.text}
                                      onChange={(e) => updateOptionText(option.id, e.target.value)}
                                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                      placeholder={`Option ${option.id}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="cursor-pointer" onClick={() => selectQuestion(question)}>
                            <p className="mb-2 truncate">{question.question || "No statement yet..."}</p>
                            <div className="text-sm text-gray-500">
                              {question.options.filter((o) => o.text).length}/4 options filled
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 mb-6">
                    No questions added yet. Click the button below to add your first question.
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={addQuestion}
                    disabled={currentQuiz.questions.length >= 5}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      currentQuiz.questions.length < 5
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Question ({currentQuiz.questions.length}/5)
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("quizzes")}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

