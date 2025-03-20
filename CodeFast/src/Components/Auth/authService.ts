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
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  },


  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default authService;
