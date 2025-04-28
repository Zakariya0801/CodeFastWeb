import {afterEach, vi, beforeAll} from 'vitest';
import {cleanup } from '@testing-library/react';
import "@testing-library/jest-dom"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}) 