import { useEffect, useState } from "react";
import authService from "../Auth/authService";
import axiosInstance from "../../Utils/axiosInstance";
import BarChartComponent from "../Shared/Graphs/BarChart";
import { Course } from "../User/Courses";
import TopBar from "../Shared/Topbar";

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
}

const AdminDashboard = () => {

    const [pic, setPic] = useState("");
    const [user, setuser] = useState<User>();
    const getPic = async () => {
      const user = await authService.getUser();
      console.log("user = ", user.picture)
        const pi = await fetch(`${user?.picture}`);
        console.log("pic = ", pi)
        setPic(pi.url);
        return pi;
      }
    useEffect(() => {
        // setuser(getCurr());
        getPic();
    }, []);
  const performanceData = [
    { name: "Sat",  quizzes: 80 },
    { name: "Sun",  quizzes: 65 },
    { name: "Mon",  quizzes: 55 },
    { name: "Tue",  quizzes: 45 },
    { name: "Wed",  quizzes: 85 },
    { name: "Thu",  quizzes: 40 },
    { name: "Fri",  quizzes: 90 },
  ]
  const [students,setstudents] = useState([]);
  const [quizzes,setquizzes] = useState([]);
  const [courses,setcourses] = useState<Course[]>([]);
  const getStudents =async () =>{
    const res = await axiosInstance.get("/user/");
    const resp = await axiosInstance.get("/quizzes/");
    const cour = await axiosInstance.get("/course/");
    const us = await authService.getUser();
    setuser(us);
    console.log(cour.data)
    setquizzes(resp.data.data);
    setcourses(cour.data);
    setstudents(res.data);
  }
  useEffect(() => {
    getStudents();
  },[]);

  const colors = ["#0900FF", "#2D60FF", "#515D83", "#002598", "#003EFF"];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <TopBar title="Dashboard"/>
      <div className="w-full p-10 mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-md flex-shrink-0">
            <img
              src={pic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow bg-indigo-600 rounded-2xl p-6 text-white">
            <div className="text-xs text-indigo-200 mb-1">Name</div>
            <div className="text-xl font-semibold mb-4">{user?.name}</div>

            <div className="text-xs text-indigo-200 mb-1">Email</div>
            <div className="text-sm mb-4">{user?.email}</div>

            <div className="text-2xl font-semibold mt-2">Admin</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-yellow-50 rounded-2xl p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Registered Students</div>
              <div className="text-xl font-bold">{students.length}</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Quizzes</div>
              <div className="text-xl font-bold">{quizzes.length  }</div>
            </div>
          </div>

          <div className="bg-pink-50 rounded-2xl p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">High Achievers</div>
              <div className="text-xl font-bold">1/10</div>
            </div>
          </div>

          <div className="bg-cyan-50 rounded-2xl p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-200 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Average Score</div>
              <div className="text-xl font-bold">4.5/10</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">CodeFast Performance</h2>
            <div className="h-full">
            <BarChartComponent data={performanceData} colors={colors} yrange={[0, 100]}/>
            </div>
          </div>

          {/* Courses Offered */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Courses Offered</h2>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-gray-500">{course.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

