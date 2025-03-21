"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import CourseDetail from "./CourseDetail";
import { Search, BookOpen, Plus } from "lucide-react";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  instructor: string;
  lessons: number;
  quizzes: number;
  category: string;
  lessonsList: string[];
  quizzesList: string[];
  studyMaterials: string[];
}

function Courses() {
  const [activeFilter, setActiveFilter] = useState("enrolled");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCourseClick = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    setSelectedCourse(course);
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
  };

  // Sample course data
  const courses: Course[] = [
    {
      id: 0,
      title: "Algorithm",
      subtitle: "Data Structures & Algorithms",
      description: "You will learn new algorithms to make your code optimized",
      instructor: "Sir Messam Raza",
      lessons: 12,
      quizzes: 7,
      category: "Computer Science",
      lessonsList: [
        "Introduction to Algorithms",
        "Time Complexity Analysis",
        "Space Complexity Analysis",
        "Searching Algorithms",
        "Sorting Algorithms",
        "Greedy Algorithms",
        "Dynamic Programming",
        "Graph Algorithms",
        "String Algorithms",
        "Advanced Data Structures",
        "Algorithm Design Techniques",
        "Case Studies and Applications",
      ],
      quizzesList: [
        "Algorithm Basics",
        "Complexity Analysis",
        "Searching and Sorting",
        "Greedy Algorithms",
        "Dynamic Programming",
        "Graph Algorithms",
        "Final Assessment",
      ],
      studyMaterials: [
        "Algorithm Textbook",
        "Big-O Cheat Sheet",
        "Algorithm Visualization Guide",
        "Problem Solving Techniques",
        "Coding Interview Prep",
      ],
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
      lessonsList: [
        "Introduction to Database Systems",
        "Relational Database Model",
        "SQL Fundamentals",
        "Database Design",
        "Normalization",
        "Indexing and Query Optimization",
        "Transaction Management",
        "Concurrency Control",
        "Database Security",
        "NoSQL Databases",
        "Data Warehousing",
        "Big Data and Databases",
      ],
      quizzesList: [
        "Database Basics",
        "SQL Queries",
        "Database Design",
        "Normalization",
        "Transactions and Concurrency",
        "NoSQL Concepts",
        "Final Assessment",
      ],
      studyMaterials: [
        "Database Systems Textbook",
        "SQL Reference Guide",
        "ER Diagram Templates",
        "Normalization Examples",
        "Database Performance Tuning",
      ],
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
      lessonsList: [
        "Introduction to Operating Systems",
        "Process Management",
        "Thread Management",
        "CPU Scheduling",
        "Process Synchronization",
        "Deadlocks",
        "Memory Management",
        "Virtual Memory",
        "File Systems",
        "I/O Systems",
        "Protection and Security",
        "Distributed Systems",
      ],
      quizzesList: [
        "OS Fundamentals",
        "Process Management",
        "Memory Management",
        "File Systems",
        "I/O and Security",
        "Distributed Systems",
        "Final Assessment",
      ],
      studyMaterials: [
        "Operating Systems Textbook",
        "Process Management Guide",
        "Memory Management Diagrams",
        "File System Architecture",
        "OS Security Best Practices",
      ],
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
      lessonsList: [
        "Introduction to Data Structures",
        "Arrays and Strings",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
        "Binary Search Trees",
        "Heaps",
        "Hash Tables",
        "Graphs",
        "Advanced Data Structures",
        "Applications of Data Structures",
      ],
      quizzesList: [
        "Basic Data Structures",
        "Linear Data Structures",
        "Trees and Heaps",
        "Hash Tables",
        "Graphs",
        "Advanced Structures",
        "Final Assessment",
      ],
      studyMaterials: [
        "Data Structures Handbook",
        "Time Complexity Chart",
        "Data Structure Visualization",
        "Implementation Examples",
        "Problem Solving with Data Structures",
      ],
    },
  ];

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
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
            <CourseCard key={course.id} course={course} isSelected={false} onClick={() => handleCourseClick(course.id)} />
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
