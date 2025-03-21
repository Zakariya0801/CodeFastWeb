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
          navigateByRole(role, navigate);
        }
        return;
      }
      // Handle protected routes
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        // navigateByRole(role, navigate);
      }
    };

    checkRoute();
  }, [isAuthenticated, location.pathname, role, navigate]);

  return null;
}

function navigateByRole(role: string | null, navigate: (path: string) => void) {
  switch (role) {
    case "Admin":
      navigate("/admin");
      break;
    case "Student":
      navigate("/student");
      break;
    case "Industry":
      navigate("/industry");
      break;
    default:
      navigate("/login");
  }
}

