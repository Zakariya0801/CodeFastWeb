import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Dashboard from "./Components/User/Dashboard"
import Account from "./Components/User/Account"
import StudyMaterial from "./Components/User/StudyMaterial"
import JobInternship from "./Components/User/JobInternship"
import Feedback from "./Components/User/Feedback"
import Login from "./Components/Shared/Login"
import Signup from "./Components/Shared/Signup"
import Settings from "./Components/Shared/Settings"
import Courses from "./Components/User/Courses"
import GlobalProvider from "./Components/Auth/GlobalProvider"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <main className="min-h-screen">
      <GlobalProvider>
        <ToastContainer />
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<Dashboard />} />    
              <Route path='/login' element={<Login />} />    
              <Route path='/signup' element={<Signup />} />    
              <Route path='/courses' element={<Courses />} />    
              <Route path='/account' element={<Account />} />    
              <Route path='/career' element={<Signup />} />    
              <Route path='/study-material' element={<StudyMaterial />} />    
              <Route path='/job-internship' element={<JobInternship />} />    
              <Route path='/feedback' element={<Feedback />} />    
              <Route path='/settings' element={<Settings />} />    
            </Routes>
          </Layout>
        </Router>
      </GlobalProvider>
    </main>
  )
}

export default App
