"use client"

import type React from "react"
import { ArrowLeft, Download, Share2, FileText } from "lucide-react"

interface StudyMaterialDetailProps {
  material: string
  courseTitle: string
  onBackClick: () => void
}

const StudyMaterialDetail: React.FC<StudyMaterialDetailProps> = ({ material, courseTitle, onBackClick }) => {
  // Helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        alert("Failed to copy link. Please try again.")
      })
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <button onClick={onBackClick} className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Course
      </button>

      <div className="bg-indigo-600 rounded-xl p-8 mb-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">{courseTitle}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{material}</h1>
        <p className="text-white/80">PDF • {Math.floor(Math.random() * 50) + 10} pages</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-gray-100 rounded-xl p-8 mb-8 flex flex-col items-center justify-center">
            <FileText className="w-16 h-16 text-indigo-600 mb-4" />
            <p className="text-gray-600 mb-4">Preview of {material}</p>
            <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow-sm max-h-80 overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">{material}</h3>
              <p className="text-gray-700 mb-4">
                This comprehensive guide provides detailed information about {courseTitle}. It covers all the essential
                concepts, techniques, and best practices.
              </p>
              <p className="text-gray-700 mb-4">
                Chapter 1: Introduction to {courseTitle}
                <br />
                <br />
                In this chapter, we explore the fundamental principles that underpin {courseTitle}. You'll learn about
                the historical context, key terminology, and the theoretical frameworks that guide modern approaches.
              </p>
              <p className="text-gray-700 mb-4">
                Chapter 2: Core Concepts
                <br />
                <br />
                Building on the introduction, this chapter delves deeper into the essential concepts you need to master.
                We'll examine each concept in detail, with practical examples and illustrations to reinforce your
                understanding.
              </p>
              <p className="text-gray-700 mb-4">
                Chapter 3: Advanced Techniques
                <br />
                <br />
                Once you've grasped the basics, this chapter will introduce you to more sophisticated techniques and
                methodologies. These advanced approaches will help you tackle complex problems and optimize your
                solutions.
              </p>
              <div className="border-t pt-4 text-gray-500 text-sm">Page 1 of {Math.floor(Math.random() * 50) + 10}</div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About This Material</h2>
            <p>
              This {material} is designed to help you master the concepts of {courseTitle}. It provides comprehensive
              coverage of all topics, with detailed explanations, examples, and practice exercises.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">Contents</h3>
            <ol>
              <li>Introduction to {courseTitle}</li>
              <li>Core Concepts and Principles</li>
              <li>Advanced Techniques</li>
              <li>Practical Applications</li>
              <li>Case Studies</li>
              <li>Best Practices</li>
              <li>Troubleshooting Guide</li>
              <li>Reference Tables</li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-3">How to Use This Material</h3>
            <p>
              For best results, we recommend reading this material alongside your course lessons. The content is
              structured to complement the video lectures and hands-on exercises. You can use the reference tables for
              quick lookups during practical assignments.
            </p>

            <div className="bg-indigo-50 p-4 rounded-lg my-6 border border-indigo-100">
              <h4 className="text-indigo-800 font-medium mb-2">Pro Tip</h4>
              <p className="text-indigo-700 text-sm">
                Print the cheat sheets at the end of this document and keep them handy during your practice sessions.
                They contain the most important formulas, syntax, and concepts in a condensed format.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-bold mb-4">Actions</h3>

            <div className="space-y-3">
              <a
                href={`/api/download?material=${encodeURIComponent(material)}&course=${encodeURIComponent(courseTitle)}`}
                download={`${material.replace(/\s+/g, "-").toLowerCase()}.pdf`}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-indigo-600 mr-3" />
                  <span>Download PDF</span>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.floor(Math.random() * 10) + 1}.{Math.floor(Math.random() * 10)}MB
                </span>
              </a>

              <button
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  const shareUrl = `https://courses.example.com/share/${courseTitle.replace(/\s+/g, "-").toLowerCase()}/${material.replace(/\s+/g, "-").toLowerCase()}`

                  // Try to use the Web Share API if available
                  if (navigator.share) {
                    navigator
                      .share({
                        title: `${material} - ${courseTitle}`,
                        text: `Check out this study material: ${material} for ${courseTitle}`,
                        url: shareUrl,
                      })
                      .catch((err) => {
                        // Fallback to copying to clipboard
                        copyToClipboard(shareUrl)
                      })
                  } else {
                    // Fallback for browsers that don't support the Web Share API
                    copyToClipboard(shareUrl)
                  }
                }}
              >
                <div className="flex items-center">
                  <Share2 className="w-4 h-4 text-indigo-600 mr-3" />
                  <span>Share Material</span>
                </div>
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Related Materials</h3>
              <div className="space-y-3">
                <a
                  href="https://www.geeksforgeeks.org/practice-questions-for-beginners/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="font-medium">Practice Exercises</h4>
                  <p className="text-sm text-gray-500">Supplementary practice on GeeksforGeeks</p>
                </a>
                <a
                  href="https://leetcode.com/problemset/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <h4 className="font-medium">Code Examples</h4>
                  <p className="text-sm text-gray-500">Sample implementations on LeetCode</p>
                </a>
              </div>
            </div>
            {material.includes("Textbook") && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Algorithm Textbook</h3>
                <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                  <h4 className="font-medium mb-2">Introduction to Algorithms</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    This comprehensive textbook covers all the essential algorithms and data structures you need to
                    master. The content is organized in a way that builds your knowledge progressively from basic
                    concepts to advanced techniques.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    Each chapter includes detailed explanations, pseudocode, and complexity analysis to help you
                    understand not just how algorithms work, but why they work and when to use them.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    The book also includes hundreds of exercises ranging from simple recall questions to challenging
                    problems that will test your understanding and problem-solving abilities.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      Access Full Textbook
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyMaterialDetail