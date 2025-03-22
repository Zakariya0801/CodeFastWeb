"use client"

import type React from "react"
import {Course} from "./Courses"

interface CourseCardProps {
  course: Course
  isSelected: boolean
  onClick: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isSelected, onClick }) => {
  // Generate a consistent color based on the course title
  const getColorClass = (title: string) => {
    const colors = ["bg-blue-600", "bg-indigo-600", "bg-purple-600", "bg-violet-600"]
    const index = title.length % colors.length
    return colors[index]
  }

  const bgColorClass = getColorClass(course.name)

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <div className={`h-48 ${bgColorClass} relative p-4 flex flex-col justify-between`}>
        {course.category && (
          <div className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full w-fit">
            {course.category}
          </div>
        )}
        <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg">
          <h3 className="text-white font-bold text-lg">{course.name}</h3>
          <p className="text-white/90 text-sm mt-1">{course.subtitle}</p>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          {/* Course illustration - using initials as a fallback */}
          <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl">
            {course.name.substring(0, 2)}
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
              {course.instructor.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>
            <span className="text-xs text-gray-600">{course.instructor.name}</span>
          </div>
          <div className="flex items-center gap-1">
            
            <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
              {course.quizzes} quizzes
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard

