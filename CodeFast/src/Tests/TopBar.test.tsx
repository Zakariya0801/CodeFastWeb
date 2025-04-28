import { describe, it, expect } from 'vitest'
import TopBar from '../Components/Shared/Topbar'
import { customRender } from './customRender'



describe('TopBar', () => {
  it('renders TopBar with title', () => {
    const { getByText } = customRender(<TopBar title="Dashboard" />)
    expect(getByText('Dashboard')).toBeTruthy()
  })
})
