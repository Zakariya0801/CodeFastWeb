import { describe, it } from 'vitest'
import QuizDetail from '../Components/User/QuizDetail'
import { customRender } from './customRender'

const mockQuiz = {
  _id: "1",
  title: 'Sample Quiz',
  Questions: [{ question: 'Q1', options: ['A', 'B', 'C', 'D'], correctOption: 1 }],
  courseId: { 
    _id: 1, 
    name: 'Sample Course', 
    subtitle: 'Course Subtitle', 
    description: 'Course Description', 
    instructor: {name: 'Instructor Name'}, 
    duration: 10, 
    level: 'Beginner',
    quizzes: 10,
    category: 'Sample Category',
    studyMaterials: []
  },
  totalMarks: 10,
  isAttempted: false
}

describe('QuizDetail', () => {
  it('renders quiz details', () => {
    customRender(<QuizDetail quiz={mockQuiz} courseTitle="Test Course" onBackClick={() => {}} />)
  })
})
