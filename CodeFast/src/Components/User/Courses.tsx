"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import CourseDetail from "./CourseDetail";
import { Search, BookOpen, Plus } from 'lucide-react';
import axiosInstance from "../../Utils/axiosInstance";
import TopBar from "../Shared/Topbar";
import { useGlobalContext } from "../Auth/GlobalProvider";


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
  const [selectedCompletedCourse, setCompletedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourseData] = useState<Course[]>([]);
  const [Unenrolled, setUnenrolledCourse] = useState<Course[]>([]);
  const [Completed, setCompleted] = useState<Course[]>([]);
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };
  const {isDarkMode} = useGlobalContext();

  const handleCourseClick = (courseId: number) => {
    const course = courses.find((c) => c._id === courseId);
    if (!course) return;
    setSelectedCourse(course);
  };
  const handleCourseClickCompleted = (courseId: number) => {
    const course = courses.find((c) => c._id === courseId);
    if (!course) return;
    setCompletedCourse(course);
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
    setCompletedCourse(null);
  };
  
  const getCourses = async () =>{
    setIsLoading(true);
    try {
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
      }));
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  const getQuizes = async () =>{
    try {
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
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
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

        // set completed courses to those which have all quizes attempted
        setCompleted(updatedCourses.filter((course) => {
          return course.quizzesList?.every((quiz) => quiz.isAttempted);
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
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())) && !course.quizzesList?.every((quiz) => quiz.isAttempted))
    } 
  );

  const filteredUnenrolled = Unenrolled.filter(
    (course) => 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompleted = Completed.filter(
    (course) => 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(selectedCompletedCourse){
    return <CourseDetail course={selectedCompletedCourse} onBackClick={handleBackClick} onUnenroll={() => null} completed={true} />;
  }
  // If a course is selected, show the course detail view
  else if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBackClick={handleBackClick} onUnenroll={() => unenrollCourse(selectedCourse._id)} />;
  }

  // Otherwise show the course catalog
  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-200 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <TopBar title="Courses" />
      <div className={`container mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-grow`}>
        <div className="mb-8 sm:mb-10">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2`}>Course Catalog</h1>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Explore your learning journey with our comprehensive course offerings
          </p>
        </div>

        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10`}>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeFilter === "enrolled"
                  ? isDarkMode 
                    ? "bg-blue-700 text-white shadow-md" 
                    : "bg-blue-100 text-blue-700 border border-blue-300 shadow-sm"
                  : isDarkMode 
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600" 
                    : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() => handleFilterClick("enrolled")}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Enrolled Courses</span>
              <span className="sm:hidden">Enrolled</span>
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeFilter === "enroll"
                  ? isDarkMode 
                    ? "bg-blue-700 text-white shadow-md" 
                    : "bg-blue-100 text-blue-700 border border-blue-300 shadow-sm"
                  : isDarkMode 
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600" 
                    : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() => handleFilterClick("enroll")}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Enroll New Course</span>
              <span className="sm:hidden">Enroll</span>
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeFilter === "completed"
                  ? isDarkMode 
                    ? "bg-blue-700 text-white shadow-md" 
                    : "bg-blue-100 text-blue-700 border border-blue-300 shadow-sm"
                  : isDarkMode 
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600" 
                    : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() => handleFilterClick("completed")}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Completed Courses</span>
              <span className="sm:hidden">Completed</span>
            </button>
          </div>

          <div className="relative mt-4 md:mt-0 w-full md:w-auto md:min-w-[240px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            </div>
            <input
              type="text"
              className={`w-full rounded-lg focus:ring-2 focus:ring-blue-500 block pl-10 p-2.5 ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeFilter === "enrolled" && (
              <>
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course._id} course={course} isSelected={false} onClick={() => handleCourseClick(course._id)} />
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-12 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"} shadow-sm`}>
                    <BookOpen className={`mx-auto h-12 w-12 ${isDarkMode ? "text-gray-500" : "text-gray-300"}`} />
                    <h3 className="mt-2 text-lg font-medium">No enrolled courses found</h3>
                    <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {searchQuery ? "No courses match your search criteria." : "You haven't enrolled in any courses yet."}
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => handleFilterClick("enroll")}
                    >
                      Browse Available Courses
                    </button>
                  </div>
                )}
              </>
            )}
            
            {activeFilter === "enroll" && (
              <>
                {filteredUnenrolled.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredUnenrolled.map((course) => (
                      <CourseCard key={course._id} course={course} isSelected={false} onClick={() => enrollCourse(course._id)} />
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-12 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"} shadow-sm`}>
                    <Plus className={`mx-auto h-12 w-12 ${isDarkMode ? "text-gray-500" : "text-gray-300"}`} />
                    <h3 className="mt-2 text-lg font-medium">No available courses found</h3>
                    <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {searchQuery ? "No courses match your search criteria." : "You've enrolled in all available courses."}
                    </p>
                  </div>
                )}
              </>
            )}
            
            {activeFilter === "completed" && (
              <>
                {filteredCompleted.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCompleted.map((course) => (
                      <CourseCard key={course._id} course={course} isSelected={false} onClick={() => handleCourseClickCompleted(course._id)} />
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-12 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"} shadow-sm`}>
                    <BookOpen className={`mx-auto h-12 w-12 ${isDarkMode ? "text-gray-500" : "text-gray-300"}`} />
                    <h3 className="mt-2 text-lg font-medium">No completed courses yet</h3>
                    <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {searchQuery ? "No courses match your search criteria." : "You haven't completed any courses yet."}
                    </p>
                    {courses.length > 0 && (
                      <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => handleFilterClick("enrolled")}
                      >
                        View Enrolled Courses
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Courses;