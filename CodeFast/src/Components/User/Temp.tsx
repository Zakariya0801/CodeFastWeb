import TopBar from "../Shared/Topbar"
import { useState } from "react";

function TempDashboard() {
  // Commented state variables preserved from original code
  // const [selectedContacts,setselectedContacts]=useState('Month');
  // const [selectedEvents,setselectedEvents]=useState('Month');
  // const [selectedCase,setselectedCase]=useState('Month');
  // const [selectedCaseNumber,setselectedCaseNumber]=useState('Month');
  // const [selectedReferral,setselectedReferral]=useState('Month');
  // const [selectedFilter, setSelectedFilter] = useState('Number of Cases');
  
  return (
    <div className='py-5 px-4 space-y-10'>
      <TopBar title="Overview"/>

      <div className='flex flex-col lg:flex-row gap-6 w-full'>
        {/* Left card - My Information */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Information</h2>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 md:p-6 text-white">
            <div className="mb-4 md:mb-6">
              <p className="text-xs text-blue-200">Name</p>
              <p className="text-lg md:text-xl font-bold">Messam Raza</p>
            </div>
            <div className="flex justify-between mb-4 md:mb-6">
              <div>
                <p className="text-xs text-blue-200">Degree</p>
                <p className="text-sm md:text-base font-medium">Bachelors in Computer Science</p>
              </div>
              <div>
                <p className="text-xs text-blue-200">CGPA</p>
                <p className="text-sm md:text-base font-medium">3.85</p>
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold">Data Scientist</p>
            </div>
          </div>
        </div>

        {/* Right card - Recent Quiz Attempts */}
        <div className="w-full lg:w-1/2">
          <h3 className='text-[#2D60FF] font-semibold text-xl md:text-2xl'>Recent Quiz Attempts</h3>
          <div className='rounded-3xl mt-4 md:mt-6 bg-[#F5F5F5] p-4 md:p-5 flex flex-col'>
            <div> 
              <p className="text-sm text-gray-600">Name</p>
              <h3 className="text-lg md:text-2xl mb-4 md:mb-8">Messam Raza</h3>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div>
                <p className="text-sm text-gray-600">Degree</p>
                <h3 className="text-lg md:text-2xl mb-4 md:mb-8">Bachelors in Computer Science</h3>
              </div>
              <div>
                <p className="text-sm text-gray-600">CGPA</p>
                <h3 className="text-lg md:text-2xl mb-4 md:mb-8">3.84</h3>
              </div>
            </div>
            <div className="border p-3 md:p-4 rounded-lg">
              <h3 className="text-lg md:text-2xl">Data Science</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add more responsive sections here as needed */}
      
    </div>
  )
}

export default TempDashboard