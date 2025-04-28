import { describe, it, } from 'vitest'
import CourseCard from '../Components/User/CourseCard'
import { customRender } from './customRender'
import { fireEvent, screen } from '@testing-library/react'

const mockCourse = {
  _id: 1,
  name: 'Demo Course',
  subtitle: 'Subtitle',
  description: 'This is a test course',
  instructor: { name: 'John Doe' },
  quizzes: 5,
  category: 'Development',
  studyMaterials: []
}

describe('CourseCard', () => {
  it('renders course card', () => {
    customRender(<CourseCard course={mockCourse} isSelected={false} onClick={() => {}} />)
  })
})

describe('CourseCard', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    customRender(
      <CourseCard 
        course={{ _id: 2, name: "Course1", subtitle: "Sub", description: "Desc", instructor: { name: "Teacher" }, quizzes: 2, category: "Science", studyMaterials: [] }}
        isSelected={false}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('Course1'));
    expect(handleClick).toHaveBeenCalled();
  });
});
