// authGuard.ts
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../Components/Auth/authService";
// import axiosInstance from "./axiosInstance";

export function AuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const [role, setRole] = useState<string | null>(null);
  const getUserRole = async() => {
    const r = await authService.getRole();
    console.log(r)
    setRole(r);
  }

  useEffect(() => {
    getUserRole();
  },[])

  const publicPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/terms",
    "/privacy",
  ];

  React.useEffect(() => {
    const checkRoute = async () => {
      // Handle public routes
      if (publicPaths.includes(location.pathname)) {
        if (isAuthenticated && location.pathname === "/login") {
          // navigateByRole(role, navigate);
        }
        return;
      }
      // Handle protected routes
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        if(checkRoutes(role!, location.pathname)){
          return;
        }
        navigateByRole(role, navigate, "/");
      }
    };

    checkRoute();
  }, [isAuthenticated, location.pathname, role, navigate]);

  return null;
}
function checkRoutes(role:string, pathname: string) {
  //checks if Student is going to /student, Admin is going to /admin, Industry is going to /industry
  if(role === "Student" && pathname.substring(0,8) !== "/student"){
    return false;
  }
  if(role === "Admin" && pathname.substring(0,6) !== "/admin"){
    return false;
  }
  if(role === "Industry" && pathname.substring(0,9) !== "/industry"){
    return false;
  }
  return true;
}


export function navigateByRole(role: string | null, navigate: (path: string) => void, path: string) {
  switch (role) {
    case "Admin":
      navigate(`/admin${path}` );
      break;
    case "Student":
      navigate(`/student${path}`);
      break;
    case "Industry":
      navigate(`/industry${path}`);
      break;
    default:
      navigate("/login");
  }
}

