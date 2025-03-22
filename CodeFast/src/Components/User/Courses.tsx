"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import CourseDetail from "./CourseDetail";
import { Search, BookOpen, Plus } from "lucide-react";
import axiosInstance from "../../Utils/axiosInstance";


export interface Course {
  _id: number;
  name: string;
  subtitle: string;
  description: string;
  instructor: Instructor;
  quizzes: number;
  category: string;
  quizzesList?: Quiz[];
  studyMaterials: string[];
}


export interface Questions{
  question:string,
  options: string[],
  correctOption: number,
}

export interface Quiz{
  _id: string,
  courseId: Course,
  title:string,
  totalMarks: number,
  Questions: Questions[]
}

interface Instructor{
  name: string
}

function Courses() {
  const [activeFilter, setActiveFilter] = useState("enrolled");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourseData] = useState<Course[]>([]);
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [isSet, setisSet] = useState(false);
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCourseClick = (courseId: number) => {
    const course = courses.find((c) => c._id === courseId);
    if (!course) return;
    setSelectedCourse(course);
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
  };
  
  const getCourses = async () =>{
    const response = await axiosInstance.get("/course/");

    setCourseData(response.data);
  }
  const getQuizes = async () =>{
    const response = await axiosInstance.get("/quizzes/");

    setQuizData(response.data.data);
  }

  useEffect(() =>{
    getCourses();
    getQuizes();
    console.log("updating")
  }, [])
  
  useEffect(() => {
    if (courses.length > 0 && quizData.length > 0) {
      setCourseData(prevCourses => {
        const updatedCourses = prevCourses.map(course => ({
          ...course,
          quizzesList: quizData.filter(q => q.courseId._id === course._id)
        }));
  
        // Check if the new state is actually different to avoid infinite re-renders
        if (JSON.stringify(updatedCourses) !== JSON.stringify(prevCourses)) {
          return updatedCourses;
        }
        return prevCourses; // Prevents unnecessary re-renders
      });
    }
  }, [courses, quizData]);




  // Sample course data
  // const courses: Course[] = [
  //   {
  //     _id: 0,
  //     title: "Algorithm",
  //     subtitle: "Data Structures & Algorithms",
  //     description: "You will learn new algorithms to make your code optimized",
  //     instructor: "Sir Messam Raza",
  //     quizzes: 7,
  //     category: "Computer Science",
  //     quizzesList: [
  //       "Algorithm Basics",
  //       "Complexity Analysis",
  //       "Searching and Sorting",
  //       "Greedy Algorithms",
  //       "Dynamic Programming",
  //       "Graph Algorithms",
  //       "Final Assessment",
  //     ],
  //     studyMaterials: [
  //       "Algorithm Textbook",
  //       "Big-O Cheat Sheet",
  //       "Algorithm Visualization Guide",
  //       "Problem Solving Techniques",
  //       "Coding Interview Prep",
  //     ],
  //   },
  //   {
  //     _id: 1,
  //     title: "Database Systems",
  //     subtitle: "Manage Data to reuse it",
  //     description: "Store, Retrieve and Use data",
  //     instructor: "Sir Arban",
  //     quizzes: 7,
  //     category: "Information Technology",
      
  //     quizzesList: [
  //       "Database Basics",
  //       "SQL Queries",
  //       "Database Design",
  //       "Normalization",
  //       "Transactions and Concurrency",
  //       "NoSQL Concepts",
  //       "Final Assessment",
  //     ],
  //     studyMaterials: [
  //       "Database Systems Textbook",
  //       "SQL Reference Guide",
  //       "ER Diagram Templates",
  //       "Normalization Examples",
  //       "Database Performance Tuning",
  //     ],
  //   },
  //   {
  //     _id: 2,
  //     title: "Operating Systems",
  //     subtitle: "Make a new OS today",
  //     description: "Learn to run code on Kernels",
  //     instructor: "Sir Sibtain",
  //     quizzes: 7,
  //     category: "Computer Science",
      
  //     quizzesList: [
  //       "OS Fundamentals",
  //       "Process Management",
  //       "Memory Management",
  //       "File Systems",
  //       "I/O and Security",
  //       "Distributed Systems",
  //       "Final Assessment",
  //     ],
  //     studyMaterials: [
  //       "Operating Systems Textbook",
  //       "Process Management Guide",
  //       "Memory Management Diagrams",
  //       "File System Architecture",
  //       "OS Security Best Practices",
  //     ],
  //   },
  //   {
  //     _id: 3,
  //     title: "Data Structures",
  //     subtitle: "Data Types and Structures",
  //     description: "Learn new data types and structure in Coding",
  //     instructor: "Sir Zakariya Abbas",
  //     quizzes: 7,
  //     category: "Computer Science",
      
  //     quizzesList: [
  //       "Basic Data Structures",
  //       "Linear Data Structures",
  //       "Trees and Heaps",
  //       "Hash Tables",
  //       "Graphs",
  //       "Advanced Structures",
  //       "Final Assessment",
  //     ],
  //     studyMaterials: [
  //       "Data Structures Handbook",
  //       "Time Complexity Chart",
  //       "Data Structure Visualization",
  //       "Implementation Examples",
  //       "Problem Solving with Data Structures",
  //     ],
  //   },
  // ];

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>{
      console.log("courseadasd = ", course)
      return (course &&
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()))

    } 
  );

  // If a course is selected, show the course detail view
  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBackClick={handleBackClick} />;
  }

  // Otherwise show the course catalog
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Catalog</h1>
        <p className="text-gray-600">Explore your learning journey with our comprehensive course offerings</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex gap-3">
          <button
            className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
              activeFilter === "enrolled"
                ? "bg-blue-100 text-blue-700 border border-blue-300 shadow-sm"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleFilterClick("enrolled")}
          >
            <BookOpen className="w-4 h-4" />
            Enrolled Courses
          </button>
          <button
            className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
              activeFilter === "add"
                ? "bg-blue-100 text-blue-700 border border-blue-300 shadow-sm"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleFilterClick("add")}
          >
            <Plus className="w-4 h-4" />
            Add New Course
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} isSelected={false} onClick={() => handleCourseClick(course._id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Courses;
