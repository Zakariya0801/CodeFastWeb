"use client"

import type React from "react"
import { ArrowLeft, PlayCircle, Download, BookOpen } from "lucide-react"

interface LessonDetailProps {
  lesson: string
  courseTitle: string
  onBackClick: () => void
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, courseTitle, onBackClick }) => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <button onClick={onBackClick} className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Course
      </button>

      <div className="bg-blue-600 rounded-xl p-8 mb-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-medium">{courseTitle}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{lesson}</h1>
        <p className="text-white/80">Duration: {Math.floor(Math.random() * 30) + 15} minutes</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center mb-8">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Click to play lesson video</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Lesson Content</h2>
            <p>
              This lesson covers the fundamental concepts of {lesson}. You will learn the core principles and practical
              applications through a combination of video lectures, interactive examples, and hands-on exercises.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">Learning Objectives</h3>
            <ul>
              <li>Understand the key concepts of {lesson}</li>
              <li>Apply theoretical knowledge to practical scenarios</li>
              <li>Analyze and solve related problems</li>
              <li>Develop skills for real-world applications</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Key Concepts</h3>
            <p>The main topics covered in this lesson include:</p>
            <ol>
              <li>Introduction to {lesson}</li>
              <li>Core principles and methodologies</li>
              <li>Practical applications and case studies</li>
              <li>Advanced techniques and optimizations</li>
              <li>Best practices and common pitfalls</li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-3">Hands-on Exercise</h3>
            <p>
              Complete the following exercise to reinforce your understanding of the concepts covered in this lesson:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg my-4">
              <p className="font-medium">Exercise: Implement a solution for {lesson}</p>
              <p>Create a working example that demonstrates your understanding of the key concepts.</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-bold mb-4">Lesson Resources</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-blue-600 mr-3" />
                  <span>Lesson Slides</span>
                </div>
                <span className="text-xs text-gray-500">PDF • 2.4 MB</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-blue-600 mr-3" />
                  <span>Exercise Files</span>
                </div>
                <span className="text-xs text-gray-500">ZIP • 1.8 MB</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-blue-600 mr-3" />
                  <span>Code Examples</span>
                </div>
                <span className="text-xs text-gray-500">ZIP • 3.2 MB</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-blue-600 mr-3" />
                  <span>Reference Guide</span>
                </div>
                <span className="text-xs text-gray-500">PDF • 1.5 MB</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Next Steps</h3>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Complete & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonDetail

