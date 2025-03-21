import axiosInstance from "../../Utils/axiosInstance";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  teamName: string;
  vat: string;
  phone: string;
}

const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    
  },

  signup: async (data: SignupData) => {
    const response = await axiosInstance.post("/auth/signup", data);
    console.log(response.data);
    if (response.data.token) {
      // Store token and role after signup
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },


  isAuthenticated: () => {
      const token = localStorage.getItem("token");
    
      if (!token) return false; // No token found, consider it expired
    
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const exp = payload.exp; 
        console.log("exp = ", exp)
        if (!exp) return false; // If no exp field, consider expired
        console.log("val = ", Date.now() >= exp * 1000)
        return Date.now() < exp * 1000; // Convert to milliseconds and compare
      } catch (error) {
        console.error("Invalid token format:", error);
        return false; // If decoding fails, assume expired
      }
    
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getRole: async () => {
    const res = await axiosInstance.get("/user/role");
    return res.data.role;
  },
};

export default authService;
