"use client"

import type React from "react"
import { useState } from "react"
import CourseCard from "./CourseCard"
// Sample course data
const courses = [
  {
    id: 0,
    title: "Algorithm",
    subtitle: "Data Structres & Algorithms",
    description: "You will learn new algorithms to make your code optimized",
    instructor: "Sir Messam Raza",
    lessons: 12,
    quizzes: 7,
    category: "Computer Science",
  },
  {
    id: 1,
    title: "Database Systems",
    subtitle: "Manage Data to reuse it",
    description: "Store, Retrieve and Use data",
    instructor: "Sir Arban",
    lessons: 12,
    quizzes: 7,
    category: "Information Technology",
  },
  {
    id: 2,
    title: "Operating Systems",
    subtitle: "Make a new OS today",
    description: "Learn to run code on Kernels",
    instructor: "Sir Sibtain",
    lessons: 12,
    quizzes: 7,
    category: "Computer Science",
  },
  {
    id: 3,
    title: "Data Structures",
    subtitle: "Data Types and Structures",
    description: "Learn new data types and structure in Coding",
    instructor: "Sir Zakariya Abbas",
    lessons: 12,
    quizzes: 7,
    category: "Computer Science",
  },
]

const CourseCatalog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("enrolled")

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
        <p className="text-sm text-gray-600">My Courses / Catalog</p>
      </div>

      <div className="flex gap-2 mb-8">
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === "enrolled"
              ? "bg-blue-100 text-blue-600 border border-blue-300"
              : "bg-white border border-gray-300"
          }`}
          onClick={() => handleFilterClick("enrolled")}
        >
          Enrolled Course
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === "add"
              ? "bg-blue-100 text-blue-600 border border-blue-300"
              : "bg-white border border-gray-300"
          }`}
          onClick={() => handleFilterClick("add")}
        >
          Add New Course
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === "unenroll"
              ? "bg-blue-100 text-blue-600 border border-blue-300"
              : "bg-white border border-gray-300"
          }`}
          onClick={() => handleFilterClick("unenroll")}
        >
          Unenroll Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} isSelected={false} onClick={function (): void {
                throw new Error("Function not implemented.")
            } } />
        ))}
      </div>
    </div>
  )
}

export default CourseCatalog

