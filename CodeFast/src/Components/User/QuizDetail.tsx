"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface QuizDetailProps {
  quiz: string
  courseTitle: string
  onBackClick: () => void
}

const QuizDetail: React.FC<QuizDetailProps> = ({ quiz, courseTitle, onBackClick }) => {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  // Generate sample questions
  const questions = [
    {
      question: `What is the primary focus of ${quiz}?`,
      options: [
        "Understanding theoretical concepts",
        "Applying practical techniques",
        "Analyzing complex problems",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      question: `Which of the following is NOT a key component of ${quiz}?`,
      options: ["Algorithmic thinking", "Data manipulation", "Social networking", "Problem decomposition"],
      correctAnswer: 2,
    },
    {
      question: `In the context of ${quiz}, what does optimization typically refer to?`,
      options: ["Making code run faster", "Using less memory", "Improving readability", "Both A and B"],
      correctAnswer: 3,
    },
    {
      question: `Which approach is best for solving problems related to ${quiz}?`,
      options: ["Top-down approach", "Bottom-up approach", "Depends on the specific problem", "Random testing"],
      correctAnswer: 2,
    },
    {
      question: `What is the relationship between ${courseTitle} and ${quiz}?`,
      options: [
        "They are completely unrelated",
        "They are complementary concepts",
        `${quiz} is a subset of ${courseTitle}`,
        `${courseTitle} is a subset of ${quiz}`,
      ],
      correctAnswer: 2,
    },
  ]

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleSelectAnswer = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctCount = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / questions.length) * 100)

    alert(`Quiz completed!\nYour score: ${score}%\nCorrect answers: ${correctCount}/${questions.length}`)
    setQuizStarted(false)
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <button onClick={onBackClick} className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Course
      </button>

      <div className="bg-purple-600 rounded-xl p-8 mb-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">{courseTitle}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{quiz}</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>{questions.length} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>15 minutes</span>
          </div>
        </div>
      </div>

      {!quizStarted ? (
        <div className="bg-white rounded-xl border p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Quiz Instructions</h2>

          <div className="space-y-4 mb-8">
            <p className="text-gray-700">
              This quiz will test your knowledge of {quiz}. Please read each question carefully and select the best
              answer.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Important Information</p>
                  <ul className="list-disc pl-5 mt-2 text-blue-700 text-sm">
                    <li>You will have 15 minutes to complete this quiz</li>
                    <li>There are {questions.length} multiple-choice questions</li>
                    <li>You can navigate between questions</li>
                    <li>Your score will be displayed at the end</li>
                    <li>A passing score is 70% or higher</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border p-8 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Time remaining: 14:32
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion] === index ? "border-purple-500 bg-purple-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className={`px-4 py-2 rounded-lg border ${
                currentQuestion > 0
                  ? "border-gray-300 hover:bg-gray-50"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            )}
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between">
              {Array.from({ length: questions.length }).map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentQuestion === index
                      ? "bg-purple-600 text-white"
                      : selectedAnswers[index] !== undefined
                        ? "bg-purple-100 text-purple-600 border border-purple-300"
                        : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizDetail

