import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Dashboard from "./Components/User/Dashboard"
import Courses from "./Components/User/Courses"
import Account from "./Components/User/Account"
import Career from "./Components/User/Career"
import StudyMaterial from "./Components/User/StudyMaterial"
import JobInternship from "./Components/User/JobInternship"
import Feedback from "./Components/User/Feedback"
import StudentDashboard from "./Components/User/TempDashboard"
import Login from "./Components/Shared/Login"
import Signup from "./Components/Shared/Signup"

function App() {

  return (
    <main className="min-h-screen">
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<StudentDashboard />} />    
            <Route path='/login' element={<Login />} />    
            <Route path='/signup' element={<Signup />} />    
            <Route path='/courses' element={<Dashboard />} />    
            <Route path='/account' element={<Account />} />    
            <Route path='/career' element={<Signup />} />    
            <Route path='/study-material' element={<StudyMaterial />} />    
            <Route path='/job-internship' element={<JobInternship />} />    
            <Route path='/feedback' element={<Feedback />} />    
          </Routes>
        </Layout>
      </Router>
    </main>
  )
}

export default App
