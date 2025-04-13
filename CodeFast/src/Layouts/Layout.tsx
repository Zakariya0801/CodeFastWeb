import React from "react"
import Sidebar from "../Components/User/Sidebar"
import { useLocation } from "react-router-dom";
import { Paths } from "../Utils/types";
import authService from "../Components/Auth/authService";
import AdminSidebar from "../Components/Admin/SideBar";
import IndustrySidebar from "../Components/Industry/Sidebar";

export default function Layout ({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const role = authService.getRole();
 
    return (
      <div className='flex w-full'>
        {
          (location.pathname!=="/login" && location.pathname!=="/signup")&&
          (role ==="Student"  ? <Sidebar route={(Paths[location.pathname as keyof typeof Paths] ? location.pathname : "/") as keyof typeof Paths} />: 
          role === "Admin" ? <AdminSidebar route={(Paths[location.pathname as keyof typeof Paths] ? location.pathname : "/") as keyof typeof Paths} />: 
          <IndustrySidebar route={(Paths[location.pathname as keyof typeof Paths] ? location.pathname : "/") as keyof typeof Paths} />)
        }

        <div className='w-full'>
          {children}
        </div>
      </div>
    )
  }