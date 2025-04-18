import { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TopBar from '../Shared/Topbar';

interface Student {
    id: number;
    name: string;
    picture: string;
    degree: string;
    university: string;
    SPerformance: string;
    cgpa: number;
    email: string;
    enrollmentDate: string;
    currentSemester: number;
    completedCourses: string[];
    ongoingCourses: string[];
    }

const UserManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student| null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

// In your render method:

const getStudents = async () => {
    const response = await axiosInstance.get('/user');

    const formattedStudents = response.data.map((student: any) => ({
        id: student._id, // MongoDB uses _id, so assigning it to id
        name: student.name,
        picture: student.picture || "", // Default empty string if not provided
        degree: student.degree,
        university: student.university?.name || "", // Nested university object
        cgpa: student.cgpa,
        email: student.email,
        SPerformance: student.sPerformance,
        enrollmentDate: new Date(student.createdAt).toLocaleString("en-US", { 
            year: "numeric", 
            month: "2-digit", 
            day: "2-digit", 
            hour: "2-digit", 
            minute: "2-digit", 
            second: "2-digit", 
            hour12: false 
        }).replace(",", ""), // Assuming createdAt is the enrollment date
        currentSemester: student.currentSemester || 1, // Default semester 1 if missing
        completedCourses: student.completedCourses || [], // Default empty array
        ongoingCourses: student.ongoingCourses || [] // Default empty array
        
    }));

    console.log("students = ", formattedStudents);
    setLoading(false);

    setStudents(formattedStudents);
};

useEffect(() => {
    getStudents();
    }, []);

  const handleRemoveStudent = async (id:any) => {
    setStudents(students.filter(student => student.id !== id));
    const res = await axiosInstance.delete(`/user/${id}`);
    toast.success(res.data.message);
  };

  const handleStudentClick = (student:any) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  if(loading) return (
    <div className="w-full p-6">
        <TopBar title="User Management"/>
      <h2 className="text-2xl font-bold mb-6">Registered Students</h2>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-600">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Degree
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                CGPA
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {Array(5).fill(Array(5)).map((_, index) => (
            <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                    <Skeleton circle width={40} height={40} />
                    </div>
                    <div className="ml-4">
                    <Skeleton width={120} />
                    <Skeleton width={150} />
                    </div>
                </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton width={100} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton width={150} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton width={50} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton width={40} />
                </td>
            </tr>
            ))}
            </tbody>
            </table>
        </div>
        );
  return (
    <div className="w-full p-6">
        <TopBar title="User Management"/>
      <h2 className="text-2xl font-bold mb-6">Registered Students</h2>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Degree
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                CGPA
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr 
                key={student.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleStudentClick(student)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={student.picture || "/placeholder.svg"} alt={student.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.degree}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.university}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.cgpa}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveStudent(student.id);
                    }}
                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-indigo-600 text-white p-6 rounded-t-lg flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{selectedStudent?.name}</h3>
                <p className="text-indigo-100">{selectedStudent.email}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <img 
                  src={selectedStudent.picture || "/placeholder.svg"} 
                  alt={selectedStudent.name} 
                  className="h-40 w-40 rounded-full object-cover mb-4 border-4 border-indigo-100"
                />
                <div className="text-center">
                  <h4 className="text-xl font-semibold">{selectedStudent.name}</h4>
                  <p className="text-gray-600">{selectedStudent.university}</p>

                  <div className="flex flex-1 w-full justify-center ">
                    <div className='mt-2 bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full'>
                    CGPA: {selectedStudent.cgpa}
                    </div>
                  </div>
                  <div className="flex flex-1 w-full justify-center ">
                    <div className=' mt-2 bg-indigo-100 text-indigo-800  py-1 px-3 rounded-full'>
                    SPerformance: {selectedStudent.SPerformance}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Degree Program</h4>
                    <p>{selectedStudent.degree}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Current Semester</h4>
                    <p>{selectedStudent.currentSemester}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Enrollment Date</h4>
                    <p>{selectedStudent.enrollmentDate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">University</h4>
                    <p>{selectedStudent.university}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Completed Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.completedCourses.map((course, index) => (
                      <span key={index} className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Ongoing Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.ongoingCourses.map((course, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Performance Graph</h4>
                  <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center border border-dashed border-gray-300">
                    {/* Empty div for graph as requested */}
                    <p className="text-gray-400">Graph will be added here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;