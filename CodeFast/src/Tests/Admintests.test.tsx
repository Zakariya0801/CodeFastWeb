// src/__tests__/Feedback.test.tsx
import { describe, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from './customRender';
import Feedback from '../Components/Admin/Feedback';
import Courses from '../Components/Admin/Courses';
import AddCourse from '../Components/Admin/AddCourse';
import IndustryManagement from '../Components/Admin/IndustryManagement';
import AdminSidebar from '../Components/Admin/SideBar';
import UserManagement from '../Components/Admin/UserManagement';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import axiosInstance from '../Utils/axiosInstance';

vi.mock('../../Utils/axiosInstance');

describe('Feedback Component', () => {
  it('renders User Suggestions heading', () => {
    customRender(<Feedback />);
    expect(screen.getByText(/User Suggestions/i)).toBeInTheDocument();
  });

  
});



describe('Courses Component', () => {
  it('renders Course Catalog heading', () => {
    customRender(<Courses />);
    expect(screen.getByText(/Course Catalog/i)).toBeInTheDocument();
  });
});


describe('AddCourse Component', () => {
  it('renders Add New Course heading', () => {
    customRender(<AddCourse setActiveFilter={() => {}} />);
    expect(screen.getByText(/Add New Course/i)).toBeInTheDocument();
  });
});



describe('IndustryManagement Component', () => {
  it('renders Registered Students heading', () => {
    vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
        data: { data: [{ _id: '1', name: 'Test Industry', description: 'Test Description' }] }
        });
    customRender(<IndustryManagement />);
    expect(screen.getByText(/All Industry/i)).toBeInTheDocument();
  });
});




describe('AdminSidebar Component', () => {
  it('renders Dashboard link', () => {
    customRender(<AdminSidebar route="/" />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});

describe('UserManagement Component', () => {
  it('renders Registered Students heading', () => {
    customRender(<UserManagement />);
    expect(screen.getByText(/Registered Students/i)).toBeInTheDocument();
  });
});



describe('AdminDashboard Component', () => {
  it('renders Admin Dashboard sections', () => {
    customRender(<AdminDashboard />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Registered Students/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Quizzes/i)).toBeInTheDocument();
  });
});


describe('Feedback Component', () => {
    it('renders suggestions after fetch', async () => {
        vi.spyOn(axiosInstance, 'get').mockImplementation((url: string) => {
            if (url === '/suggestion/') {
              return Promise.resolve({
                data: { data: [{ _id: '1', Email: 'test@example.com', Type: 'Bug', Suggestion: 'Fix it', createdAt: new Date().toISOString() }] }
              });
            }
          
            // Default fallback if some other GET happens
            return Promise.resolve({ data: {} });
          });
  
      customRender(<Feedback />);
      expect(await screen.findByText(/test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/Fix it/i)).toBeInTheDocument();
    });
  
});

describe('Feedback Component', () => {
    it('deletes a suggestion', async () => {
      vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
        data: { data: [{ _id: '1', Email: 'test@example.com', Type: 'Bug', Suggestion: 'Fix it', createdAt: new Date().toISOString() }] }
      });
  
      vi.spyOn(axiosInstance, 'delete').mockResolvedValueOnce({});
  
      customRender(<Feedback />);
      
      const deleteButton = await screen.findByTitle(/Delete/i);
      await userEvent.click(deleteButton);
  
      // After delete, it should disappear
      expect(screen.queryByText(/test@example.com/i)).not.toBeInTheDocument();
    });
  });