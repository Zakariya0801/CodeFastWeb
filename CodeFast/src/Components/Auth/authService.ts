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
    console.log("res[p = ", response.data)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  },
  route: (path: string) =>{
    switch (localStorage.getItem("role")) {
      case "Admin":
        return`/admin${path}`;
        break;
      case "Student":
        return `/student${path}`;
        break;
      case "Industry":
        return `/industry${path}`;
        break;
      default:
        return path;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    
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
    console.log("please work = ", res.data.user)
    return res.data.user;
  },

  getRole: () => {
    return localStorage.getItem("role");
  },
};

export default authService;
