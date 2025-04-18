import { useEffect, useState } from "react";
import authService from "../Auth/authService";
import TopBar from "../Shared/Topbar";

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
}

const Dashboard = () => {

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
 
  const getStudents =async () =>{
    const us = await authService.getUser();
    console.log("useasasr = ", us)
    setuser(us);
  }
  useEffect(() => {
    getStudents();
  },[]);

  console.log("user = ", user)
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

            <div className="text-2xl font-semibold mt-2">Industry</div>
          </div>
        </div>


        
      </div>
    </div>
  )
}

export default Dashboard

