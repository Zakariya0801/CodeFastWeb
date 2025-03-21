"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Course } from "./CourseCard";

interface ICourseDetails {
  course: Course;
  onBackClick: () => void;
}

const CourseDetails = ({ course, onBackClick }: ICourseDetails) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <button onClick={onBackClick} className="flex items-center text-blue-600 mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Catalog
      </button>

      <div className="bg-blue-600 rounded-lg p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
        <p className="mb-4">{course.subtitle}</p>
        <div className="flex items-center">
          <span className="text-sm mr-4">Instructor: {course.instructor}</span>
          <span className="text-sm">
            {course.lessons} lessons • {course.quizzes} quizzes
          </span>
        </div>
      </div>

      <div className="mb-6 border-b">
        <div className="flex space-x-6">
          {[
            { key: "overview", label: "Overview" },
            { key: "materials", label: "Study Materials" },
            { key: "quizzes", label: "Quizzes" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`pb-2 px-1 ${
                activeTab === key ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="prose max-w-none">
          <h2 className="text-xl font-bold mb-4">Course Overview</h2>
          <p className="mb-4">
            {course.description ||
              `This comprehensive course covers everything you need to know about ${course.title}. Through a series of engaging lessons and practical exercises, you will gain the skills and knowledge required to excel in this subject.`}
          </p>
          <h3 className="text-lg font-bold mb-2">What you'll learn</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Fundamental concepts and principles</li>
            <li>Practical applications and techniques</li>
            <li>Advanced strategies and methodologies</li>
            <li>Real-world problem solving</li>
          </ul>
          <h3 className="text-lg font-bold mb-2">Course Structure</h3>
          <p>
            This course consists of {course.lessons} lessons and {course.quizzes} quizzes designed to test your
            understanding and reinforce your learning.
          </p>
        </div>
      )}

      {activeTab === "materials" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Study Materials</h2>
          <div className="space-y-4">
            {["Introduction", "Core Concepts", "Advanced Techniques", "Practical Applications"].map((module, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">Module {index + 1}: {module}</h3>
                  <p className="text-sm text-gray-500">PDF, Video, and Interactive exercises</p>
                </div>
                <button className="text-blue-600 hover:underline">Access</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "quizzes" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Quizzes</h2>
          <div className="space-y-4">
            {Array.from({ length: course.quizzes }, (_, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">Quiz {i + 1}: {[
                    "Fundamentals",
                    "Intermediate Concepts",
                    "Advanced Topics",
                    "Final Assessment",
                  ][i % 4]}</h3>
                  <p className="text-sm text-gray-500">10 questions • 15 minutes</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Start Quiz</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
