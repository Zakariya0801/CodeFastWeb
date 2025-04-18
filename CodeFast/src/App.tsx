import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Login from "./Components/Shared/Login"
import Signup from "./Components/Shared/Signup"
import Settings from "./Components/Shared/Settings"
import GlobalProvider, { useGlobalContext } from "./Components/Auth/GlobalProvider"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthGuard } from "./Utils/authGuard"
import StudentLayout from "./Layouts/StudentLayout"
import AdminLayout from "./Layouts/AdminLayout"
import IndustryLayout from "./Layouts/IndustryLayout"
import { useEffect } from "react";

// AppContent component to access the context
function AppContent() {
  const { isDarkMode } = useGlobalContext();
  
  // Apply dark mode to the document body for global styling
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1f2937'; // bg-gray-800
      document.body.style.minHeight = '100vh';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f9fafb'; // bg-gray-50
      document.body.style.minHeight = '100vh';
    }
  }, [isDarkMode]);

  return (
    <main className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
      <Router>
        <AuthGuard />
        <Layout>
          <Routes>
            <Route path='/student/*' element={<StudentLayout />} />    
            <Route path='/admin/*' element={<AdminLayout />} />
            <Route path='/industry/*' element={<IndustryLayout />} />    
            <Route path='/login' element={<Login />} />    
            <Route path='/signup' element={<Signup />} />    
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </main>
  );
}

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  )
}

export default App