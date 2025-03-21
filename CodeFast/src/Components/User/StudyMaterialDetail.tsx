"use client"

import type React from "react"
import { ArrowLeft, Download, Bookmark, Share2, Printer, FileText } from "lucide-react"

interface StudyMaterialDetailProps {
  material: string
  courseTitle: string
  onBackClick: () => void
}

const StudyMaterialDetail: React.FC<StudyMaterialDetailProps> = ({ material, courseTitle, onBackClick }) => {
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
            <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">{material}</h3>
              <p className="text-gray-700 mb-4">
                This comprehensive guide provides detailed information about {courseTitle}. It covers all the essential
                concepts, techniques, and best practices.
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
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-indigo-600 mr-3" />
                  <span>Download PDF</span>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.floor(Math.random() * 10) + 1}.{Math.floor(Math.random() * 10)}MB
                </span>
              </button>

              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Printer className="w-4 h-4 text-indigo-600 mr-3" />
                  <span>Print Material</span>
                </div>
                <span className="text-xs text-gray-500">{Math.floor(Math.random() * 50) + 10} pages</span>
              </button>

              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Bookmark className="w-4 h-4 text-indigo-600 mr-3" />
                  <span>Save for Later</span>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Share2 className="w-4 h-4 text-indigo-600 mr-3" />
                  <span>Share Material</span>
                </div>
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Related Materials</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h4 className="font-medium">Practice Exercises</h4>
                  <p className="text-sm text-gray-500">Supplementary workbook</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h4 className="font-medium">Quick Reference Guide</h4>
                  <p className="text-sm text-gray-500">Handy cheat sheet</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h4 className="font-medium">Code Examples</h4>
                  <p className="text-sm text-gray-500">Sample implementations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyMaterialDetail

