"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import CourseDetail from "./CourseDetail";
import { Search, BookOpen, Plus } from "lucide-react";
import axiosInstance from "../../Utils/axiosInstance";
import TopBar from "../Shared/Topbar";


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
  obtained?: number
}

interface Instructor{
  name: string
}

function Courses() {
  const [activeFilter, setActiveFilter] = useState("enrolled");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourseData] = useState<Course[]>([]);
  const [Unenrolled, setUnenrolledCourse] = useState<Course[]>([]);
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCourseClick = (courseId: number) => {
    const course = courses.find((c) => c._id === courseId);
    if (!course) return;
    setSelectedCourse(course);
  };
  const enrollCourse = ( courseId: number) => {
    axiosInstance.post("/course/registrations/", {
      courseId: courseId
    }).then((response) => {
      console.log(response)
      getCourses();
    }).catch((error) => {
      console.log(error)
    })
  }

  const unenrollCourse = ( courseId: number) => {
    axiosInstance.delete("/course/registrations/", {
      data: {
        courseId: courseId
      }
    }).then((response) => {
      console.log(response)
      getCourses();
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleBackClick = () => {
    setSelectedCourse(null);
  };
  
  const getCourses = async () =>{
    const response = await axiosInstance.get("/course/");
    const resp = await axiosInstance.get("/course/registrations/");
    console.log("response = ", response.data)
    console.log("current = ", resp.data)
    const registrations = resp.data.data;
    console.log(response.data.filter((course: Course) => registrations.some((reg: any) => reg.courseId === course._id)))
    setCourseData(response.data.filter((course: Course) => registrations.some((reg: any) => reg.courseId === course._id)));
    setUnenrolledCourse(response.data.filter((course: Course) =>{
      console.log("checking = ", course._id , "  and  ")
      return !registrations.some((reg: any) =>{
        console.log(String(reg.courseId) === String(course._id)) 
        return String(reg.courseId) === String(course._id)

      })
    }
    ));
  }
  const getQuizes = async () =>{
    const response = await axiosInstance.get("/quizzes/");
    const res = await axiosInstance.get("/course/evaluation/");
    setQuizData(response.data.data.map((quiz:any) =>{
      return {
        ...quiz,
        isAttempted: res.data.evaluations.some((attempt:any) => {
          return attempt.quizId === quiz._id
        }),
        obtained: res.data.evaluations.find((attempt:any) => {
          return attempt.quizId === quiz._id
        })?.score
      }
    }));
  }

  useEffect(() =>{
    getCourses();
    getQuizes();
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
  console.log("quizzzessss = ",courses)


  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>{
      return (course &&
        (course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())))
    } 
  );

  // If a course is selected, show the course detail view
  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBackClick={handleBackClick} onUnenroll={() => unenrollCourse(selectedCourse._id)} />;
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
            Enrolled Courses
          </button>
          <button
            className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
              activeFilter === "enroll"
                ? "bg-blue-100 text-blue-700 border border-blue-300 shadow-sm"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleFilterClick("enroll")}
          >
            <Plus className="w-4 h-4" />
            Enroll New Course
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
          {Unenrolled.map((course) => (
            <CourseCard key={course._id} course={course} isSelected={false} onClick={() => enrollCourse(course._id)} />
          ))}
        </div>
      )}
      
    </div>
    </>
  );
}

export default Courses;
