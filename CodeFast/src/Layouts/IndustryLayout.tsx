import React  from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Industry/Dashboard";
import Internships from "../Components/Industry/Internships";
import StudentLeaderboard from "../Components/Industry/LeaderBoard";
import EmployeeManagement from "../Components/Industry/EmployeesManagement";


const IndustryLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/leaderboard" element={<StudentLeaderboard />} />
          <Route path="/employees" element={<EmployeeManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default IndustryLayout;
