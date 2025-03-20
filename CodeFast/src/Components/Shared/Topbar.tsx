import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ITopbar{
    title: string;
}

export default function TopBar({title}: ITopbar) {
    const navigate = useNavigate()
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    return (
        <header className="flex w-full h-18 items-center justify-between border-b border-gray-200 bg-white px-4">
        {/* Left section */}
        <div className="flex items-center gap-9">
            <nav>
            <span className="text-gray-700 whitespace-nowrap">{title}</span>
            </nav>
        </div>
        <div className="w-full flex justify-end p-4">
            {/* Search bar */}
            <div className="flex max-w-md flex-1 items-center px-8">
                <div className="relative flex w-full items-center">
                {isLargeScreen && <SearchIcon className="absolute left-3 h-5 w-5 text-gray-400" />}
                <input
                    type="text"
                    placeholder="Search for something"
                    className={`w-full rounded-lg border border-gray-200 bg-gray-50 py-2 ${isLargeScreen ? "pl-10" : "pl-2"} pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                />
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
                <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" onClick={()=>navigate("/settings")}>
                <SettingsIcon className="h-5 w-5"/>
                </button>
                <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                    <BellIcon className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>
                <button className="flex items-center gap-2">
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Gq6iuNA3nbvVsOjwq4aV2hUIjBlAlC.png"
                    alt="User avatar"
                    className="h-8 w-8 rounded-lg object-cover"
                />
                </button>
            </div>
        </div>
        </header>
    )
}

