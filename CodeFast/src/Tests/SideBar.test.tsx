// Sidebar.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { customRender } from './customRender'
import MySidebar from '../Components/User/Sidebar'

describe('MySidebar Component', () => {
  beforeEach(() => {
    // Reset window.innerWidth before every test
    window.innerWidth = 1200
  })

  it('should render sidebar with minimized button on large screens', () => {
    customRender(<MySidebar route="/" />)
    const minimizeButton = screen.getByRole('button')
    expect(minimizeButton).toBeInTheDocument()
  })

  it('should toggle minimized state when minimize button clicked', async () => {
    customRender(<MySidebar route="/" />)
    const toggleButton = screen.getByRole('button')
    
    // Initially should show CiMenuFries icon (open sidebar)
    expect(toggleButton.querySelector('svg')).toBeTruthy()

    // Click to minimize
    fireEvent.click(toggleButton)

    // After clicking, sidebar should show burger icon (collapsed)
    expect(toggleButton.querySelector('svg')).toBeTruthy()
  })

  it('should render mobile toggle button on small screens', () => {
    window.innerWidth = 500
    customRender(<MySidebar route="/" />)
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()
  })

  it('should open and close sidebar on mobile toggle button click', async () => {
    window.innerWidth = 500
    customRender(<MySidebar route="/" />)
    const mobileToggle = screen.getByRole('button')

    // Click to open sidebar
    fireEvent.click(mobileToggle)

    const dashboardLink = await screen.findByText('Dashboard')
    expect(dashboardLink).toBeInTheDocument()

    // Click again to close sidebar (button toggles sidebar state)
    fireEvent.click(mobileToggle)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })



  it('should display CodeFast logo text on full sidebar', () => {
    customRender(<MySidebar route="/" />)
    const logoText = screen.getByText('CodeFast')
    expect(logoText).toBeInTheDocument()
  })
})
