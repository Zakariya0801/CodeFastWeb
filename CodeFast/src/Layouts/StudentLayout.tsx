import React  from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/User/Dashboard";
import Account from "../Components/User/Account";
import Courses from "../Components/User/Courses";
import Career from "../Components/User/Career";
import StudyMaterial from "../Components/User/StudyMaterial";
import JobInternship from "../Components/User/JobInternship";
import Feedback from "../Components/User/Feedback";


const StudentLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/courses' element={<Courses />} />    
          <Route path='/account' element={<Account />} />    
          <Route path='/career' element={<Career />} />    
          <Route path='/study-material' element={<StudyMaterial />} />    
          <Route path='/job-internship' element={<JobInternship />} />    
          <Route path='/feedback' element={<Feedback />} />    
        </Routes>
      </div>
    </div>
  );
};

export default StudentLayout;
