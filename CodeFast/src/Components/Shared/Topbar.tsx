"use client"

import { BellIcon, MoonIcon, SearchIcon, SettingsIcon, SunIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../Auth/GlobalProvider"

interface ITopbar {
  title: string
}

export default function TopBar({ title }: ITopbar) {
  const navigate = useNavigate()
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024)
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const [pic, setPic] = useState("")
  const { user, isDarkMode, setIsDarkMode } = useGlobalContext()

  const toggleDarkMode = () => {

    setIsDarkMode(!isDarkMode)
    localStorage.setItem("DarkMode", `${!isDarkMode ? "true" : "false"}`);
  }

  const getPic = async () => {
    try{const pi = await fetch(`${user?.picture}`)
      console.log("pic = ", pi)
      setPic(pi.url)
    }catch(err){
      setPic("/placeholder.svg")
    }
  }

  useEffect(() => {
    // setuser(getCurr());
    getPic()
  }, [])

  return (
    <header
      className={`flex w-full h-18 items-center justify-between border-b ${isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-200 bg-white text-gray-700"} px-4`}
    >
      {/* Left section */}
      <div className="flex items-center gap-9">
        <nav>
          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-700"} whitespace-nowrap`}>{title}</span>
        </nav>
      </div>
      <div className="w-full flex justify-end p-4">
        {/* Search bar */}
        <div className="flex max-w-md flex-1 items-center px-8">
          <div className="relative flex w-full items-center">
            {isLargeScreen && (
              <SearchIcon className={`absolute left-3 h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
            )}
            <input
              type="text"
              placeholder="Search for something"
              className={`w-full rounded-lg border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-blue-600"
                  : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
              } py-2 ${isLargeScreen ? "pl-10" : "pl-2"} pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle button */}
          <button
            className={`rounded-lg p-2 ${
              isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <button
            className={`rounded-lg p-2 ${
              isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => navigate("/settings")}
          >
            <SettingsIcon className="h-5 w-5" />
          </button>

          <button
            className={`relative rounded-lg p-2 ${
              isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button className="flex items-center gap-2">
            <img src={pic || "/placeholder.svg"} alt="User avatar" className="h-8 w-8 rounded-lg object-cover" />
          </button>
        </div>
      </div>
    </header>
  )
}
