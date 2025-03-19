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

function App() {

  return (
    <main className="min-h-screen">
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<StudentDashboard />} />    
            <Route path='/courses' element={<Dashboard />} />    
            <Route path='/account' element={<Account />} />    
            <Route path='/career' element={<Career />} />    
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
