import { describe, it } from 'vitest'
import Dashboard from '../Components/User/Dashboard'
import { customRender } from './customRender'

describe('Dashboard', () => {
  it('renders without crashing', () => {
    customRender(<Dashboard />)
  })
})
