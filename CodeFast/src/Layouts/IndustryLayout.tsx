import React  from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Industry/Dashboard";


const IndustryLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default IndustryLayout;
