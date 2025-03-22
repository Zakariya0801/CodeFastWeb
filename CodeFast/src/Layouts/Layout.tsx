import React from "react"
import Sidebar from "../Components/User/Sidebar"
import { useLocation } from "react-router-dom";
import { Paths } from "../Utils/types";
import authService from "../Components/Auth/authService";

export default function Layout ({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const role = authService.getRole();
 
    return (
      <div className='flex w-full'>
        {
          (location.pathname!=="/login" && location.pathname!=="/signup")&&
          (role ==="Student" ||role ==="Admin"   ? <Sidebar route={(Paths[location.pathname as keyof typeof Paths] ? location.pathname : "/") as keyof typeof Paths} />: null)
        }

        <div className='w-full'>
          {children}
        </div>
      </div>
    )
  }