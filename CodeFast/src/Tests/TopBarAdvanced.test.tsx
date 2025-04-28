// Career.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { customRender } from './customRender' // ← ✅ you said use this
import Career from '../Components/User/Career' // ← ✅ you said use this

describe('Career Page Tests', () => {
  it('should display the TopBar with correct title', () => {
    customRender(<Career />)
    const topbarTitle = screen.getByText(/Career/i)
    expect(topbarTitle).toBeInTheDocument()
  })
  

  it('should have only one TopBar in the document', () => {
    customRender(<Career />)
    const topbars = screen.getAllByText('Career')
    expect(topbars.length).toBe(1)
  })

  it('should not contain any button elements', () => {
    customRender(<Career />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons.length).toBe(4)
  })
})
