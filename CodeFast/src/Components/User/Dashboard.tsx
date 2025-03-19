import TopBar from "../Shared/Topbar"
import { useState } from "react";



function Dashboard() {
  // const [selectedContacts,setselectedContacts]=useState('Month');
  // const [selectedEvents,setselectedEvents]=useState('Month');
  // const [selectedCase,setselectedCase]=useState('Month');
  // const [selectedCaseNumber,setselectedCaseNumber]=useState('Month');
  // const [selectedReferral,setselectedReferral]=useState('Month');
  // const [selectedFilter, setSelectedFilter] = useState('Number of Cases');
  return (
    <div className='py-5 px-4 space-y-10'>
      <TopBar title="Overview"/>

      <div className='flex justify-between items-center'>
        <div className="min-w-[600px]">
          <h3 className='text-[#2D60FF] font-semibold text-xl md:text-2xl'>My Information</h3>
          <div className='rounded-3xl mt-6 bg-[#F5F5F5] p-4 md:p-5 flex flex-col'>
              
              <div> 
                <p className="">Name</p>
                <h3 className="text-2xl mb-8">Messam Raza  </h3>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="">Degree</p>
                  <h3 className="text-2xl mb-8">Bachelors in Computer Science </h3>
                </div>
                <div>
                  <p className="">CGPA</p>
                  <h3 className="text-2xl mb-8">3.84</h3>
                </div>
              </div>
              <div className="border-1 p-4">
                <h3 className="text-2xl">Data Science</h3>
              </div>
          
          </div>
        </div>
        <div>
          <h3 className='text-[#2D60FF] font-semibold text-xl md:text-2xl'>Recent Quiz Attempts</h3>
          <div className='rounded-3xl mt-6 bg-[#F5F5F5] p-4 md:p-5 flex flex-col min-w-[800px]'>
              
              <div> 
                <p className="">Name</p>
                <h3 className="text-2xl mb-8">Messam Raza  </h3>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="">Degree</p>
                  <h3 className="text-2xl mb-8">Bachelors in Computer Science </h3>
                </div>
                <div>
                  <p className="">CGPA</p>
                  <h3 className="text-2xl mb-8">3.84</h3>
                </div>
              </div>
              <div className="border-1 p-4">
                <h3 className="text-2xl">Data Science</h3>
              </div>
          
          </div>
        </div>
      </div>
      
     </div>
    // <></>
  )
}

export default Dashboard