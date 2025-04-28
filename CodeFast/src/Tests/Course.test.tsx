import { describe, it } from 'vitest'
import { customRender } from './customRender'
import Courses from '../Components/User/Courses'

describe('Course render without error', () => {
  it('renders without crashing', () => {
    customRender(<Courses />)
  })
})
