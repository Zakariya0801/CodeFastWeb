import {  screen, fireEvent } from '@testing-library/react';
import AddCourse from '../Components/Admin/AddCourse';
import { customRender } from './customRender';

describe('AddCourse Component', () => {
  it('should navigate through steps', () => {
    const setActiveFilter = vi.fn();
    customRender(<AddCourse setActiveFilter={setActiveFilter} />);
    
    // Fill course details
    fireEvent.change(screen.getByLabelText(/Course Name/i), { target: { value: 'Test Course' } });
    fireEvent.change(screen.getByLabelText(/Subtitle/i), { target: { value: 'A subtitle' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'A description' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Computer Science' } });

    fireEvent.click(screen.getByText(/Next: Add Quizzes/i));
    expect(screen.getByText(/Add Quizzes/i)).toBeInTheDocument();
  });
});
