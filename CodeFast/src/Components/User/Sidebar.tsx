"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CalendarIcon, SplitSquareHorizontalIcon, UserIcon } from 'lucide-react'
import { MdHome, MdMenu, MdClose } from "react-icons/md"
import { CiMenuBurger, CiMenuFries } from "react-icons/ci"
import type { IconType } from "react-icons"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Paths } from "../../Utils/types"
import authService from "../Auth/authService"
import { useGlobalContext } from "../Auth/GlobalProvider"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType | IconType
  iconSize: string
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: MdHome, iconSize: "w-7 h-7" },
  { label: "Courses", href: "/courses", icon: UserIcon, iconSize: "w-7 h-7" },
  { label: "Account", href: "/account", icon: CalendarIcon, iconSize: "w-7 h-7" },
  { label: "Job/Internship", href: "/job-internship", icon: SplitSquareHorizontalIcon, iconSize: "w-7 h-7" },
  { label: "Feedback", href: "/feedback", icon: SplitSquareHorizontalIcon, iconSize: "w-7 h-7" },
]

type RouteKeys = keyof typeof Paths

const MySidebar: React.FC<{ route: RouteKeys }> = ({ route }) => {
  const path = Paths[route]
  const [activeItem, setActiveItem] = useState(path)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024)
  const [isMinimized, setIsMinimized] = useState(false)
  const { isDarkMode } = useGlobalContext()

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Theme-based styles
  const sidebarBg = isDarkMode ? "bg-gray-700" : "bg-white"
  const headerBg = isDarkMode ? "bg-gray-700" : "bg-white-600"
  const navBg = isDarkMode ? "bg-gray-700" : "bg-white"
  const textColor = isDarkMode ? "text-gray-200" : "text-gray-800"
  const activeItemBg = isDarkMode ? "bg-blue-800" : "bg-blue-600"
  const activeItemText = "text-white"
  const hoverBg = isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
  const toggleBtnBg = isDarkMode ? "bg-gray-800" : "bg-white"
  const toggleBtnColor = isDarkMode ? "text-white" : "text-gray-800"
  const toggleBtnHoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const iconColor = isDarkMode ? "text-gray-300" : "text-gray-600"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const shadowColor = isDarkMode ? "shadow-gray-900/20" : "shadow-lg"
  const logoColor = isDarkMode ? "text-gray-200" : "text-gray-800"

  return (
    <div className="h-screen flex">
      {/* Sidebar Toggle Button (Only for lg and above) */}
      {isLargeScreen && (
        <button
          className={`fixed top-4 left-4 z-50 p-2 rounded-full ${toggleBtnBg} ${toggleBtnHoverBg} ${shadowColor}`}
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? (
            <CiMenuBurger size={20} className={toggleBtnColor} />
          ) : (
            <CiMenuFries size={20} className={toggleBtnColor} />
          )}
        </button>
      )}

      {/* Small Screen (md and below) Toggle Button */}
      {!isLargeScreen && (
        <button
          className={`fixed top-2 right-2 z-50 p-1 ${isDarkMode ? "bg-gray-800" : "bg-blue-600"} text-white rounded-md ${shadowColor}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <MdClose size={16} /> : <MdMenu size={16} />}
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isLargeScreen) && (
          <motion.aside
            initial={{ x: isLargeScreen ? 0 : -250 }}
            animate={{ x: 0 }}
            exit={{ x: isLargeScreen ? 0 : -250 }}
            transition={{ duration: 0.3 }}
            className={`${sidebarBg} shadow-md z-40 transition-all duration-300 fixed lg:relative border-r ${borderColor}
            ${isLargeScreen ? (isMinimized ? "w-20" : "w-64") : "w-64"}
            h-screen flex flex-col`}
          >
            {/* Sidebar Header */}
            <div className={`flex items-center justify-center p-4 ${headerBg}`}>
              {!isMinimized ? (
                <div className="flex items-center gap-2">
                  <img src="../../../logo.jpg" alt="CodeFast Logo" className="h-10 w-10 rounded-md" />
                  <span className={`font-bold text-2xl ${logoColor}`}>CodeFast</span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <img src="../../../logo.jpg" alt="CodeFast Logo" className="h-10 w-10 rounded-md" />
                </div>
              )}
            </div>
            <div className={`${headerBg} p-2`}></div>

            {/* Navigation Links */}
            <nav className={`flex flex-col flex-grow gap-5 px-3 ${navBg} py-4 overflow-y-auto`}>
              {navItems.map((item) => {
                const isActive = activeItem === item.label
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={authService.route(item.href)}>
                      <span
                        onClick={() => {
                          setActiveItem(item.label)
                          setIsSidebarOpen(false)
                        }}
                        className={`flex items-center gap-6 px-3 py-2 rounded-md transition-colors 
                        ${isActive ? `${activeItemBg} ${activeItemText} font-semibold` : `${textColor} ${hoverBg}`} 
                        ${isLargeScreen && isMinimized ? "justify-center" : ""}`}
                      >
                        <item.icon className={`${item.iconSize} shrink-0 ${isActive ? "text-white" : iconColor}`} />
                        {/* Always show labels on small & medium screens, toggle on large screens */}
                        {(!isLargeScreen || !isMinimized) && <span>{item.label}</span>}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Footer */}
            <div className={`p-4 ${headerBg} border-t ${borderColor} text-center text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              © {new Date().getFullYear()} CodeFast
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MySidebar
