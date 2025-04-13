"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Search, BookOpen, Plus } from "lucide-react";
import axiosInstance from "../../Utils/axiosInstance";
import TopBar from "../Shared/Topbar";
import AddCourse from "./AddCourse";


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
  isAttempted: boolean
}

interface Instructor{
  name: string
}

function Courses() {
  const [activeFilter, setActiveFilter] = useState("enrolled");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourseData] = useState<Course[]>([]);
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCourseClick = (courseId: number) => {
    // const course = courses.find((c) => c._id === courseId);
    // if (!course) return;
    // setSelectedCourse(course);
  };
  
  const getCourses = async () =>{
    const response = await axiosInstance.get("/course/");
    setCourseData(response.data);
  }
  

  useEffect(() =>{
    getCourses();
  }, [])


  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>{
      return (course &&
        (course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())))
    } 
  );

  if(activeFilter === "add"){
    return (
      <AddCourse setActiveFilter={setActiveFilter} />
    )
  }

  // Otherwise show the course catalog
  return (
    <>
      <TopBar title="Courses" />
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
            All Courses
          </button>
          <button
            className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
              activeFilter === "enroll"
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

      
      {activeFilter === "enrolled" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} isSelected={false} onClick={() => handleCourseClick(course._id)} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* <AddCourse /> */}
        </div>
      )}
      
    </div>
    </>
  );
}

export default Courses;
