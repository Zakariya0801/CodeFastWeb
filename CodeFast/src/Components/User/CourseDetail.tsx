// "use client"

// import type React from "react"
// import { useState } from "react"
// import { ArrowLeft, BookOpen, FileText, LogOut, BookMarked, Layers } from "lucide-react"
// import LessonDetail from "./LessonDetail"
// import QuizDetail from "./QuizDetail"
// import StudyMaterialDetail from "./StudyMaterialDetail"

// interface Course {
//   id: number
//   title: string
//   subtitle: string
//   description: string
//   instructor: string
//   lessons: number
//   quizzes: number
//   category?: string
//   lessonsList?: string[]
//   quizzesList?: string[]
//   studyMaterials?: string[]
// }

// interface CourseDetailProps {
//   course: Course
//   onBackClick: () => void
// }

// const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBackClick }) => {
//   const [activeTab, setActiveTab] = useState<"overview" | "lessons" | "quizzes" | "materials">("overview")
//   const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
//   const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
//   const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

//   // Generate a consistent color based on the course title
//   const getColorClass = (title: string) => {
//     const colors = ["bg-blue-600", "bg-indigo-600", "bg-purple-600", "bg-violet-600"]
//     const index = title.length % colors.length
//     return colors[index]
//   }

//   const bgColorClass = getColorClass(course.title)

//   // Generate study materials if not provided
//   const studyMaterials = course.studyMaterials || [
//     "Course Textbook",
//     "Reference Guide",
//     "Cheat Sheet",
//     "Code Examples",
//     "Practice Problems",
//   ]

//   // Handle back button from detailed views
//   const handleDetailBackClick = () => {
//     setSelectedLesson(null)
//     setSelectedQuiz(null)
//     setSelectedMaterial(null)
//   }

//   // If a specific lesson is selected
//   if (selectedLesson) {
//     return <LessonDetail lesson={selectedLesson} courseTitle={course.title} onBackClick={handleDetailBackClick} />
//   }

//   // If a specific quiz is selected
//   if (selectedQuiz) {
//     return <QuizDetail quiz={selectedQuiz} courseTitle={course.title} onBackClick={handleDetailBackClick} />
//   }

//   // If a specific study material is selected
//   if (selectedMaterial) {
//     return (
//       <StudyMaterialDetail material={selectedMaterial} courseTitle={course.title} onBackClick={handleDetailBackClick} />
//     )
//   }

//   return (
//     <div className="container mx-auto px-6 py-12 max-w-7xl relative">
//       <button onClick={onBackClick} className="flex items-center text-blue-600 mb-6 hover:underline">
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Back to Course Catalog
//       </button>

//       <div className={`${bgColorClass} rounded-xl p-8 mb-8 text-white`}>
//         <div>
//           <div className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full w-fit mb-4">
//             {course.category}
//           </div>
//           <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
//           <p className="text-xl mb-4">{course.subtitle}</p>
//           <div className="flex items-center mb-2">
//             <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium text-white mr-2">
//               {course.instructor
//                 .split(" ")
//                 .map((name) => name[0])
//                 .join("")}
//             </div>
//             <span className="text-white/90">{course.instructor}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//               {course.lessons} lessons
//             </span>
//             <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//               {course.quizzes} quizzes
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* First row of tabs */}
//       <div className="mb-2">
//         <div className="flex space-x-6">
//           <button
//             className={`pb-2 px-1 ${
//               activeTab === "overview"
//                 ? "border-b-2 border-blue-600 text-blue-600 font-medium"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveTab("overview")}
//           >
//             Overview
//           </button>
//           <button
//             className={`pb-2 px-1 flex items-center gap-2 ${
//               activeTab === "materials"
//                 ? "border-b-2 border-blue-600 text-blue-600 font-medium"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveTab("materials")}
//           >
//             <BookMarked className="w-4 h-4" />
//             Study Materials
//           </button>
//         </div>
//       </div>

//       {/* Second row of tabs */}
//       <div className="mb-8 border-b">
//         <div className="flex space-x-6">
//           <button
//             className={`pb-4 px-1 flex items-center gap-2 ${
//               activeTab === "lessons"
//                 ? "border-b-2 border-blue-600 text-blue-600 font-medium"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveTab("lessons")}
//           >
//             <BookOpen className="w-4 h-4" />
//             Lessons
//           </button>
//           <button
//             className={`pb-4 px-1 flex items-center gap-2 ${
//               activeTab === "quizzes"
//                 ? "border-b-2 border-blue-600 text-blue-600 font-medium"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveTab("quizzes")}
//           >
//             <FileText className="w-4 h-4" />
//             Quizzes
//           </button>
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <div className="prose max-w-none">
//           <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
//           <p className="text-gray-700 mb-6">{course.description}</p>
//           <p className="text-gray-700 mb-6">
//             This comprehensive course covers everything you need to know about {course.title}. Through a series of{" "}
//             {course.lessons} engaging lessons and {course.quizzes} practical quizzes, you will gain the skills and
//             knowledge required to excel in this subject.
//           </p>

//           <h3 className="text-xl font-bold mb-3">What you'll learn</h3>
//           <ul className="list-disc pl-5 mb-6 text-gray-700">
//             <li>Fundamental concepts and principles of {course.title}</li>
//             <li>Practical applications and techniques</li>
//             <li>Advanced strategies and methodologies</li>
//             <li>Real-world problem solving</li>
//             <li>Industry best practices and standards</li>
//           </ul>

//           <h3 className="text-xl font-bold mb-3">Prerequisites</h3>
//           <p className="text-gray-700 mb-6">
//             Basic understanding of computer science concepts is recommended but not required. This course is designed
//             for both beginners and intermediate learners.
//           </p>
//         </div>
//       )}

//       {activeTab === "materials" && (
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Study Materials</h2>
//           <div className="space-y-4">
//             {studyMaterials.map((material, index) => (
//               <div
//                 key={index}
//                 className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
//                 onClick={() => setSelectedMaterial(material)}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
//                     <Layers className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium">{material}</h3>
//                     <p className="text-sm text-gray-500">PDF • {Math.floor(Math.random() * 50) + 10} pages</p>
//                   </div>
//                 </div>
//                 <button className="text-blue-600 hover:underline">View Material</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === "lessons" && (
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
//           <div className="space-y-4">
//             {course.lessonsList?.map((lesson, index) => (
//               <div
//                 key={index}
//                 className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
//                 onClick={() => setSelectedLesson(lesson)}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
//                     {index + 1}
//                   </div>
//                   <div>
//                     <h3 className="font-medium">{lesson}</h3>
//                     <p className="text-sm text-gray-500">{Math.floor(Math.random() * 30) + 15} minutes</p>
//                   </div>
//                 </div>
//                 <button className="text-blue-600 hover:underline">Start Lesson</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === "quizzes" && (
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Course Quizzes</h2>
//           <div className="space-y-4">
//             {course.quizzesList?.map((quiz, index) => (
//               <div
//                 key={index}
//                 className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
//                 onClick={() => setSelectedQuiz(quiz)}
//               >
//                 <div>
//                   <h3 className="font-medium">{quiz}</h3>
//                   <p className="text-sm text-gray-500">
//                     {Math.floor(Math.random() * 10) + 5} questions • {Math.floor(Math.random() * 15) + 10} minutes
//                   </p>
//                 </div>
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Start Quiz</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Unenroll button positioned at the bottom right */}
//       <div className="fixed bottom-8 right-8">
//         <button
//           className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg"
//           onClick={() => {
//             if (confirm("Are you sure you want to unenroll from this course?")) {
//               alert("Course unenrolled successfully!")
//               onBackClick()
//             }
//           }}
//         >
//           <LogOut className="w-4 h-4" />
//           Unenroll from Course
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CourseDetail

"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, BookOpen, FileText, LogOut, BookMarked, Layers } from "lucide-react"
import LessonDetail from "./LessonDetail"
import QuizDetail from "./QuizDetail"
import StudyMaterialDetail from "./StudyMaterialDetail"

interface Course {
  id: number
  title: string
  subtitle: string
  description: string
  instructor: string
  lessons: number
  quizzes: number
  category?: string
  lessonsList?: string[]
  quizzesList?: string[]
  studyMaterials?: string[]
}

interface CourseDetailProps {
  course: Course
  onBackClick: () => void
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBackClick }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "lessons" | "quizzes" | "materials">("overview")
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

  // Generate a consistent color based on the course title
  const getColorClass = (title: string) => {
    const colors = ["bg-blue-600", "bg-indigo-600", "bg-purple-600", "bg-violet-600"]
    const index = title.length % colors.length
    return colors[index]
  }

  const bgColorClass = getColorClass(course.title)

  // Generate study materials if not provided
  const studyMaterials = course.studyMaterials || [
    "Course Textbook",
    "Reference Guide",
    "Cheat Sheet",
    "Code Examples",
    "Practice Problems",
  ]

  // Handle back button from detailed views
  const handleDetailBackClick = () => {
    setSelectedLesson(null)
    setSelectedQuiz(null)
    setSelectedMaterial(null)
  }

  // If a specific lesson is selected
  if (selectedLesson) {
    return <LessonDetail lesson={selectedLesson} courseTitle={course.title} onBackClick={handleDetailBackClick} />
  }

  // If a specific quiz is selected
  if (selectedQuiz) {
    return <QuizDetail quiz={selectedQuiz} courseTitle={course.title} onBackClick={handleDetailBackClick} />
  }

  // If a specific study material is selected
  if (selectedMaterial) {
    return (
      <StudyMaterialDetail material={selectedMaterial} courseTitle={course.title} onBackClick={handleDetailBackClick} />
    )
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl relative">
      <button onClick={onBackClick} className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Course Catalog
      </button>

      <div className={`${bgColorClass} rounded-xl p-8 mb-8 text-white`}>
        <div>
          <div className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full w-fit mb-4">
            {course.category}
          </div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-xl mb-4">{course.subtitle}</p>
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium text-white mr-2">
              {course.instructor
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>
            <span className="text-white/90">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {course.lessons} lessons
            </span>
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {course.quizzes} quizzes
            </span>
          </div>
        </div>
      </div>

      {/* First row of tabs */}
      <div className="mb-2">
        <div className="flex space-x-6">
          <button
            className={`pb-2 px-1 ${
              activeTab === "overview"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 px-1 flex items-center gap-2 ${
              activeTab === "materials"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("materials")}
          >
            <BookMarked className="w-4 h-4" />
            Study Materials
          </button>
        </div>
      </div>

      {/* Second row of tabs */}
      <div className="mb-8 border-b">
        <div className="flex space-x-6">
          <button
            className={`pb-4 px-1 flex items-center gap-2 ${
              activeTab === "lessons"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("lessons")}
          >
            <BookOpen className="w-4 h-4" />
            Lessons
          </button>
          <button
            className={`pb-4 px-1 flex items-center gap-2 ${
              activeTab === "quizzes"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("quizzes")}
          >
            <FileText className="w-4 h-4" />
            Quizzes
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-6">{course.description}</p>
          <p className="text-gray-700 mb-6">
            This comprehensive course covers everything you need to know about {course.title}. Through a series of{" "}
            {course.lessons} engaging lessons and {course.quizzes} practical quizzes, you will gain the skills and
            knowledge required to excel in this subject.
          </p>

          <h3 className="text-xl font-bold mb-3">What you'll learn</h3>
          <ul className="list-disc pl-5 mb-6 text-gray-700">
            <li>Fundamental concepts and principles of {course.title}</li>
            <li>Practical applications and techniques</li>
            <li>Advanced strategies and methodologies</li>
            <li>Real-world problem solving</li>
            <li>Industry best practices and standards</li>
          </ul>

          <h3 className="text-xl font-bold mb-3">Prerequisites</h3>
          <p className="text-gray-700 mb-6">
            Basic understanding of computer science concepts is recommended but not required. This course is designed
            for both beginners and intermediate learners.
          </p>
        </div>
      )}

      {activeTab === "materials" && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Study Materials</h2>
          <div className="space-y-4">
            {studyMaterials.map((material, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                onClick={() => setSelectedMaterial(material)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{material}</h3>
                    <p className="text-sm text-gray-500">PDF • {Math.floor(Math.random() * 50) + 10} pages</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline">View Material</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "lessons" && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
          <div className="space-y-4">
            {course.lessonsList?.map((lesson, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{lesson}</h3>
                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 30) + 15} minutes</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:underline">Start Lesson</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "quizzes" && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Course Quizzes</h2>
          <div className="space-y-4">
            {course.quizzesList?.map((quiz, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                onClick={() => setSelectedQuiz(quiz)}
              >
                <div>
                  <h3 className="font-medium">{quiz}</h3>
                  <p className="text-sm text-gray-500">
                    {Math.floor(Math.random() * 10) + 5} questions • {Math.floor(Math.random() * 15) + 10} minutes
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Start Quiz</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unenroll button positioned at the bottom right */}
      <div className="fixed bottom-8 right-8">
        <button
          className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg"
          onClick={() => {
            if (confirm("Are you sure you want to unenroll from this course?")) {
              alert("Course unenrolled successfully!")
              onBackClick()
            }
          }}
        >
          <LogOut className="w-4 h-4" />
          Unenroll from Course
        </button>
      </div>
    </div>
  )
}

export default CourseDetail

