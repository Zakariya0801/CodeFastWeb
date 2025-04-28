import React  from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import Courses from "../Components/Admin/Courses";
import UserManagement from "../Components/Admin/UserManagement";
import Requests from "../Components/Admin/Requests";
import Feedback from "../Components/Admin/Feedback";
import IndustryManagement from "../Components/Admin/IndustryManagement";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/industry" element={<IndustryManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
