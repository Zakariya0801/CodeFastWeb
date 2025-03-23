import React, { useState, useEffect } from "react";
import {
  SplitSquareHorizontalIcon,
  UserIcon,
  UsersIcon,
  FactoryIcon

} from "lucide-react";
import { MdHome, MdMenu, MdClose } from "react-icons/md";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { IconType } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Paths } from "../../Utils/types";
import authService from "../Auth/authService";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType | IconType;
  iconSize: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: MdHome, iconSize: "w-7 h-7" },
  { label: "Courses", href: "/courses", icon: UserIcon, iconSize: "w-7 h-7" },
  { label: "Industry Management", href: "/industry", icon: FactoryIcon, iconSize: "w-7 h-7" },
  { label: "User Management", href: "/user-management", icon: UsersIcon, iconSize: "w-7 h-7" },
  { label: "Feedback", href: "/feedback", icon: SplitSquareHorizontalIcon, iconSize: "w-7 h-7" },
];

type RouteKeys = keyof typeof Paths;

const AdminSidebar: React.FC<{ route: RouteKeys }> = ({ route }) => {
  const path = Paths[route];
  const [activeItem, setActiveItem] = useState(path);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isMinimized, setIsMinimized] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div className="min-h-screen flex">
      {/* Sidebar Toggle Button (Only for lg and above) */}
      {isLargeScreen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-full  hover:bg-gray-300"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? <CiMenuBurger size={20} color="white"  /> : <CiMenuFries size={20} color="white" />}
        </button>
      )}

      {/* Small Screen (md and below) Toggle Button */}
      {!isLargeScreen && (
        <button
          className="fixed top-2 right-2 z-50 p-1 bg-black text-white rounded-md shadow-lg"
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
            className={`h-full bg-white shadow-md z-40 transition-all duration-300 fixed lg:relative
            ${isLargeScreen ? (isMinimized ? "w-20" : "w-64") : "w-64"}
            `}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 bg-gray-700">
              {!isMinimized && (
                <div className="flex items-center ml-15 gap-2">
                  <img src="../../../logo.jpg" alt="CodeFast Logo" className="h-10 w-10" />
                  <span className="font-bold text-2xl text-white">CodeFast</span>
                </div>
              )}
            </div>
            <div className="bg-gray-700 p-5"></div>
            {/* Navigation Links */}
            <nav className="flex flex-col h-full gap-5 px-3 bg-gray-700">
              {navItems.map((item) => {
                const isActive = activeItem === item.label;
                return (
                  <motion.div key={item.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <Link to={authService.route(item.href)}>
                      <span
                        onClick={() => {
                          setActiveItem(item.label);
                          setIsSidebarOpen(false);
                        }}
                        className={`flex items-center gap-6 px-3 py-2 rounded-md transition-colors 
                        ${isActive ? "font-semibold text-white bg-blue-700" : "text-white"} 
                        ${isLargeScreen && isMinimized ? "justify-center" : ""}`}
                      >
                        <item.icon className={`${item.iconSize} shrink-0`} />
                        {/* Always show labels on small & medium screens, toggle on large screens */}
                        {(!isLargeScreen || !isMinimized) && <span>{item.label}</span>}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSidebar;
