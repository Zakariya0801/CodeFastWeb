import React from "react"
import Sidebar from "../Components/Shared/Sidebar"
import { useLocation } from "react-router-dom";
import { Paths } from "../Utils/types";

export default function Layout ({ children }: { children: React.ReactNode }) {
  const location = useLocation();
 
    return (
      <div className='flex w-full'>
        {
          (location.pathname!=="/login")&&
          <Sidebar route={(Paths[location.pathname as keyof typeof Paths] ? location.pathname : "/") as keyof typeof Paths} />
        }

        <div className='w-full'>
          {children}
        </div>
      </div>
    )
  }