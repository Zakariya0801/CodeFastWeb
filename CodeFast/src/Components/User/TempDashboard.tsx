import { PieChart, Pie, Cell, BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const StudentDashboard = () => {
  // Weekly activity data
  const weeklyData = [
    { name: 'Sat', quizzes: 2.6, past: 3.8 },
    { name: 'Sun', quizzes: 2.1, past: 3.2 },
    { name: 'Mon', quizzes: 2.8, past: 3.0 },
    { name: 'Tue', quizzes: 3.3, past: 3.8 },
    { name: 'Wed', quizzes: 2.6, past: 2.2 },
    { name: 'Thu', quizzes: 2.7, past: 3.4 },
    { name: 'Fri', quizzes: 3.2, past: 3.4 },
  ];

  // Topic expertise data
  const expertiseData = [
    { name: 'DB', value: 35, color: '#3b5bdb' },
    { name: 'Data Structures', value: 30, color: '#364063' },
    { name: 'Operating Systems', value: 20, color: '#f06595' },
    { name: 'Algorithms', value: 15, color: '#fd7e14' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Information</h2>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
            <div className="mb-6">
              <p className="text-xs text-blue-200">Name</p>
              <p className="text-xl font-bold">Messam Raza</p>
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <p className="text-xs text-blue-200">Degree</p>
                <p className="font-medium">Bachelors in Computer Science</p>
              </div>
              <div>
                <p className="text-xs text-blue-200">CGPA</p>
                <p className="font-medium">3.85</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">Data Scientist</p>
            </div>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Quizes</h2>
            <a href="#" className="text-sm text-gray-600">See All</a>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">Data Structures</p>
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

        {/* Weekly Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Activity</h2>
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
              <span className="text-sm text-gray-600">Quizes</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
              <span className="text-sm text-gray-600">Past</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Bar dataKey="past" fill="#4c6ef5" radius={[10, 10, 0, 0]} barSize={20} />
                <Bar dataKey="quizzes" fill="#38b2ac" radius={[10, 10, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Expertise */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Topic Expertise</h2>
          <div className="h-64 flex justify-center">
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

        {/* Current Jobs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Jobs</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">CodeFast Div 4</p>
                <p className="text-sm text-gray-500">4/8 questions</p>
              </div>
              <div className="text-gray-700 font-medium">123 pts</div>
            </div>
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">Code Sprint 1.0</p>
                <p className="text-sm text-gray-500">5/7 questions</p>
              </div>
              <div className="text-gray-700 font-medium">101 pts</div>
            </div>
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">FPSC</p>
                <p className="text-sm text-gray-500">1/8 questions</p>
              </div>
              <div className="text-gray-700 font-medium">92 pts</div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscription</h2>
          {/* Empty subscription section as shown in the image */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;