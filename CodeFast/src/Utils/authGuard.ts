// authGuard.ts
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../Components/Auth/authService";
import axiosInstance from "./axiosInstance";

export function AuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const role = authService.getRole();
  const publicPaths = [
    "/",
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
        const allowed = await isRouteAllowed(location.pathname, role);
        if (!allowed) {
          navigateByRole(role, navigate);
        }
      }
    };

    checkRoute();
  }, [isAuthenticated, location.pathname, role, navigate]);

  return null;
}

function navigateByRole(role: string | null, navigate: (path: string) => void) {
  switch (role) {
    case "superadmin":
      navigate("/superadmin");
      break;
    case "admin":
      navigate("/admin");
      break;
    case "user":
      navigate("/user");
      break;
    default:
      navigate("/login");
  }
}

async function isRouteAllowed(
  pathname: string,
  role: string | null
): Promise<boolean> {
  if (!role) return false;
  const token = localStorage.getItem("token");
  try {
    const user = await axiosInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (user.data.role !== role) {
      //set the role in local storage
      localStorage.setItem("role", user.data.role);
      return false;
    }
    return pathname.startsWith(`/${role.toLowerCase()}`);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}
