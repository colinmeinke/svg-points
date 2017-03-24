/* globals test expect */

import valid from '../src/valid'

test('should not be valid when passed a string', () => {
  const shape = ''
  const result = valid(shape)
  expect(result.valid).toEqual(false)
  expect(result.errors).toHaveLength(3)
})

test('should not be valid when not passed a type prop', () => {
  const shape = {}
  const result = valid(shape)
  expect(result.valid).toEqual(false)
  expect(result.errors).toHaveLength(3)
})

test('should not be valid when circle not passed a cx prop', () => {
  const shape = { type: 'circle', cy: 50, r: 5 }
  const result = valid(shape)
  expect(result.valid).toEqual(false)
  expect(result.errors).toHaveLength(2)
})

test('should not be valid when circle passed a cx prop of the incorrect type', () => {
  const shape = { type: 'circle', cx: 'foo', cy: 50, r: 5 }
  const result = valid(shape)
  expect(result.valid).toEqual(false)
  expect(result.errors).toHaveLength(1)
})

test('should not be valid when circle passed correct props', () => {
  const shape = { type: 'circle', cx: 10, cy: 50, r: 5 }
  const result = valid(shape)
  expect(result.valid).toEqual(true)
  expect(result.errors).toHaveLength(0)
})
