import { render } from '@testing-library/react'
import { GlobalContext } from '../Components/Auth/GlobalProvider'
import { BrowserRouter } from 'react-router-dom'

const dummyUser = {
  _id: "user123",
  name: "John Doe",
  email: "johndoe@example.com",
  degree: "Bachelor of Computer Science",
  cgpa: "3.8",
  sPerformance: 2.7,
  subscribedPlan: 1,
  university: { name: "CodeFast University" },
  picture: "https://via.placeholder.com/150",
  role: "student",
}

export const customRender = (ui: React.ReactElement) => {
  return render(
    <GlobalContext.Provider value={{ user: dummyUser, setUser: () => {}, isDarkMode: false, setIsDarkMode: () => {} }}>
        <BrowserRouter>
      {ui}
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}