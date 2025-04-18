import { FaBook, FaTrophy, FaArrowDown, FaChartLine, FaCode } from "react-icons/fa"
import TopBar from "../Shared/Topbar"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../Auth/GlobalProvider"
import axiosInstance from "../../Utils/axiosInstance"
import { Course } from "./Courses"
import LineGraphComponent from "../Shared/Graphs/LineGraphComponent"
import { useNavigate } from "react-router-dom"
import { navigateByRole } from "../../Utils/authGuard"
import authService from "../Auth/authService"
import { toast } from "react-toastify";

const Account = () => {
  
  const [courses, setCourseData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscriptionChanged, setSubscriptionChanged] = useState<boolean>(false);
  
  // Statistics Data
  const statsData = [
    {
      id: 1,
      title: "Registered Courses",
      value: courses?.length,
      icon: <FaBook className="text-yellow-500" size={24} />,
    },
    {
      id: 2,
      title: "Maximum Score",
      value: "10/10",
      icon: <FaTrophy className="text-blue-500" size={24} />,
    },
    {
      id: 3,
      title: "Minimum Score",
      value: "1/10",
      icon: <FaArrowDown className="text-pink-500" size={24} />,
    },
    {
      id: 4,
      title: "Average Score",
      value: "4.5/10",
      icon: <FaChartLine className="text-green-500" size={24} />,
    },
  ]
  
  const getCourses = async () => {
    const response = await axiosInstance.get("/course/");
    const resp = await axiosInstance.get("/course/registrations/");
    const registrations = resp.data.data;
    setCourseData(response.data.filter((course: Course) => registrations.some((reg: any) => reg.courseId === course._id)));
  }

  useEffect(() => {
    getCourses();
  }, [])

  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  
  const getUSer = async () => {
    try {
      const userData = await authService.getUser();
      console.log("Fetched user data:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  
  useEffect(() => {
    getUSer();
  }, []);
  
  // Effect to refresh user data when subscription changes
  useEffect(() => {
    if (subscriptionChanged) {
      console.log("Subscription changed, refreshing user data");
      getUSer();
      setSubscriptionChanged(false);
    }
  }, [subscriptionChanged]);
  
  // Subscription Data
  const subscriptionData = {
    balance: "$5,756",
    cardHolder: user?.name,
    validThru: "12/22",
    cardNumber: "3778 **** **** 1234",
  }
  
  const [pic, setPic] = useState("");
  
  const getPic = async () => {
    console.log("fetching pic = ", user?.picture)
    const pi = await fetch(`${user?.picture}`);
    console.log("pic = ", pi)
    setPic(pi.url);
    return pi;
  }
    
  useEffect(() => {
    // setuser(getCurr());
    getPic();
  }, [user]);

  const [linechartData, setLineData] = useState([]);

  useEffect(() => {
    const getAnalytics = async () => {
      const { data } = await axiosInstance.get("/user/analytics");
      setLineData(data.logs);
    };
    getAnalytics();
  }, []);

  // Function to handle subscription toggle
  const handleSubscriptionToggle = async () => {
    try {
      if (!user?._id) {
        alert("User ID not found. Please log in again.");
        return;
      }
      
      setIsLoading(true);
      
      if (user.subscribedPlan === -1) {
     
        console.log("Attempting to subscribe user with ID:", user._id);
        const response = await axiosInstance.put(`/user/subscribe/${user._id}`);
        console.log("Subscribe API response:", response);
        
      
        toast.success("Successfully subscribed!");
        setSubscriptionChanged(true);
      } else {
        // Unsubscribe the user
        console.log("Attempting to unsubscribe user with ID:", user._id);
        
        try {
          const response = await axiosInstance.put(`/user/unsubscribe/${user._id}`);
          console.log("Unsubscribe API response:", response);
          
          // Don't update local state directly, we'll refresh from server
          toast.success("Successfully unsubscribed!");
          setSubscriptionChanged(true);
        } catch (unsubError) {
          console.error("Unsubscribe API error:", unsubError);
         
        }
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast.error("Failed to update subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <TopBar title="Account" />
      <div className="mt-10 mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden border border-blue-200 mb-6">
          <div className="w-full md:w-48 bg-white p-4 flex items-center justify-center">
            <img
              src={pic || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 bg-blue-600 text-white p-6">
            <div className="mb-6">
              <p className="text-xs text-blue-200 mb-1">Name</p>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <p className="text-xs text-blue-200 mb-1">Degree</p>
                <p>{user?.degree}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-200 mb-1">CGPA</p>
                <p>{user?.cgpa}</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold">{user?.university?.name}</h3>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg p-4 flex items-center border border-gray-200 shadow-sm"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              <div className="p-3 rounded-full bg-gray-100 mr-4">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrolled Courses Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Enrolled Courses</h3>
              <button className="text-sm text-blue-600 hover:underline" onClick={() => navigateByRole(authService.getRole(), navigate,"/courses")}>See All</button>
            </div>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gray-100 mr-3"><FaCode className="text-blue-500" size={24} /></div>
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-xs text-gray-500">{course.instructor?.name}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">Remove</button>
                </div>
              ))}
            </div>
          </div>

          {/* CodeFast Performance Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">CodeFast Performance</h3>
            {/* Empty div for graph integration */}
            <div id="" className="h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Activity</h2>
              <LineGraphComponent data={linechartData} dataKey="date" />
            </div>
          </div>

          {/* Subscription Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Subscription</h3>
              <div className="subscription-status">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  user?.subscribedPlan === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user?.subscribedPlan === 1 ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="bg-blue-600 rounded-lg p-4 text-white mb-4">
              <p className="text-xs mb-1">Balance</p>
              <p className="text-2xl font-bold mb-4">{subscriptionData.balance}</p>

              <p className="text-xs mb-1">CARD HOLDER</p>
              <p className="mb-2">{subscriptionData.cardHolder}</p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs mb-1">VALID THRU</p>
                  <p>{subscriptionData.validThru}</p>
                </div>
                <div className="flex space-x-1">
                  <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                </div>
              </div>

              <p className="text-xl">{subscriptionData.cardNumber}</p>
            </div>
            
            {/* Subscription Button */}
            <button 
              onClick={handleSubscriptionToggle}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex justify-center items-center ${
                user?.subscribedPlan === 1 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              {user?.subscribedPlan === 1 ? 'Unsubscribe' : 'Subscribe Now'}
            </button>
            
            {/* Subscription Info */}
            <div className="mt-4 text-sm text-gray-600">
              {user?.subscribedPlan === 1 ? (
                <div>
                  <p className="font-medium mb-2">Premium Benefits:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Access to all premium courses</li>
                    <li>Advanced performance analytics</li>
                    <li>Priority support</li>
                    <li>No advertisements</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <p className="font-medium mb-2">Subscribe to unlock:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Access to all premium courses</li>
                    <li>Advanced performance analytics</li>
                    <li>Priority support</li>
                    <li>No advertisements</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account