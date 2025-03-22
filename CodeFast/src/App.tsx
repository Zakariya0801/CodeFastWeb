import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Login from "./Components/Shared/Login"
import Signup from "./Components/Shared/Signup"
import Settings from "./Components/Shared/Settings"
import GlobalProvider from "./Components/Auth/GlobalProvider"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthGuard } from "./Utils/authGuard"
import StudentLayout from "./Layouts/StudentLayout"
import AdminLayout from "./Layouts/AdminLayout"

function App() {

  return (
    <main className="min-h-screen">
      <GlobalProvider>
        <ToastContainer />
        <Router>
          <AuthGuard />
          <Layout>
            <Routes>
              <Route path='/student/*' element={<StudentLayout />} />    
              <Route path='/admin/*' element={<AdminLayout />} />    
              <Route path='/login' element={<Login />} />    
              <Route path='/signup' element={<Signup />} />    
              <Route path='/settings' element={<Settings />} />    
            </Routes>
          </Layout>
        </Router>
      </GlobalProvider>
    </main>
  )
}

export default App
