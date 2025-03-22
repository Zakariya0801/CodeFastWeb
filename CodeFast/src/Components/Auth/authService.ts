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
      localStorage.setItem("user", response.data.user);
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
    return localStorage.getItem("token") !== null;
    
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
  getUser: async () => {
    const res = await axiosInstance.get("/user/me");
    return res.data.user;
  },

  getRole: async () => {
    const res = await axiosInstance.get("/user/role");
    return res.data.role;
  },
};

export default authService;
