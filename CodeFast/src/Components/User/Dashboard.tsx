import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import LineGraphComponent from "../Shared/Graphs/LineGraphComponent"
import TopBar from "../Shared/Topbar"

function Dashboard() {
  // Commented state variables preserved from original code
  // const [selectedContacts,setselectedContacts]=useState('Month');
  // const [selectedEvents,setselectedEvents]=useState('Month');
  // const [selectedCase,setselectedCase]=useState('Month');
  // const [selectedCaseNumber,setselectedCaseNumber]=useState('Month');
  // const [selectedReferral,setselectedReferral]=useState('Month');
  // const [selectedFilter, setSelectedFilter] = useState('Number of Cases');
  const lineData = [
    { "Day" : "Monday", "SPerformance": 3.5},
    { "Day" : "Tuesday", "SPerformance": 3.5},
    { "Day" : "Wednesday", "SPerformance": 3.5},
    { "Day" : "Thursday", "SPerformance": 3.75},
    { "Day" : "Friday", "SPerformance": 3.75},
    { "Day" : "Saturday", "SPerformance": 3.9},
    { "Day" : "Sunday", "SPerformance": 2},
  ]

  const expertiseData = [
    { name: 'DB', value: 35, color: '#3b5bdb' },
    { name: 'Data Structures', value: 30, color: '#364063' },
    { name: 'Operating Systems', value: 20, color: '#f06595' },
    { name: 'Algorithms', value: 15, color: '#fd7e14' },
  ];

  const QuizData = [
    {
      "name": "Data Structures",
      "date": "13 October 2024",
      "increment": "+123"
    },
    {
      "name": "Algorithms",
      "date": "10 September 2024",
      "increment": "+12"
    },
    {
      "name": "Database Systems",
      "date": "1 January 2024",
      "increment": "+1"
    },
  ]
  return (
    <div className='py-5 px-4 space-y-10'>
      <TopBar title="Overview"/>
      
      <div className="flex justify-between  px-4 sm:px-6 lg:px-8 flex-col lg:flex-row">
        {/* Left card - My Information */}
        <div className="w-xl lg:w-2xl bg-gray-50 px-4  ">
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
        <div className="space-y-4 bg-gray-50 px-4  ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Quizes</h2>
            {QuizData.map((quiz, index) => (
              
              <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 flex-grow min-w-[400px] max-w-[700px]">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">{quiz.name}</p>
                <p className="text-sm text-gray-500">{quiz.date}</p>
              </div>
              <div className="text-green-500 font-medium">{quiz.increment}</div>
            </div>
            ))}
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">Algorithms</p>
                <p className="text-sm text-gray-500">10 September 2024</p>
              </div>
              <div className="text-green-500 font-medium">+123</div>
            </div>
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">Database Systems</p>
                <p className="text-sm text-gray-500">1 January 2024</p>
              </div>
              <div className="text-green-500 font-medium">+101</div>
            </div>
          </div>
        </div>
      
      {/* Add more responsive sections here as needed */}
      <div className="flex  flex-col lg:flex-row gap-4">
        {/* Line Chart */}
        <div className="w-full lg:w-1/2 bg-gray-50 px-4  rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Activity</h2>
          <LineGraphComponent data={lineData} dataKey="Day" />
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 bg-gray-50 px-4  rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Topic Expertise</h2>
          <div className="h-64 flex justify-center items-center mt-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expertiseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expertiseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex  flex-col lg:flex-row gap-4 justify-between">
        <div className="space-y-4 bg-gray-50 px-4  ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Jobs</h2>
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 w-2xl">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Junior Software Engineer</p>
                  <p className="text-sm text-gray-500">13 October 2024</p>
                </div>
                <div className="text-red-500 font-medium">-100</div>
              </div>
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">UI/UX Designer</p>
                  <p className="text-sm text-gray-500">10 September 2024</p>
                </div>
                <div className="text-green-500 font-medium">+123</div>
              </div>
              
        </div>


        <div className="space-y-4 bg-gray-50 px-4  ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscription</h2>
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 w-2xl">
                
              </div>
              
              
        </div>
      </div>

      

    </div>
  )
}

export default Dashboard