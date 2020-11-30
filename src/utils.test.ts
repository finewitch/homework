import { isScoreWithinThreshold, extractDescriptions, findMatchingDescriptions } from './utils'
import { exampleDbLabelsResource } from '../test/test-data'
test('isScoreWithinThreshold', () => {
  expect(
    isScoreWithinThreshold(10, 15, 5)
  ).toBe(true)
})

test('isScoreWithinThreshold', () => {
  expect(
    isScoreWithinThreshold(10, 16, 5)
  ).toBe(false)
})

test('extractDescriptions', () => {
  expect(
    extractDescriptions('1.jpg', exampleDbLabelsResource())
  ).toEqual({ 'Natural foods': 0.9950245022773743 })
})

test('extractDescriptions', () => {
  expect(
    extractDescriptions('10.jpg', exampleDbLabelsResource())
  ).toBe(undefined)
})

test('findMatchingDescriptions', () => {
  const exampleLabel = exampleDbLabelsResource()

  const enchancedResourcesExample = {
    ...exampleDbLabelsResource(),
    '2.jpg': exampleLabel['1.jpg']
  }

  expect(
    findMatchingDescriptions('1.jpg', { 'Natural foods': 0.9950245022773743 }, enchancedResourcesExample)
  ).toEqual({ '2.jpg': [{ 'Natural foods': 0.9950245022773743 }] })
})

test('findMatchingDescriptions', () => {
  const exampleLabel = exampleDbLabelsResource()

  const enchancedResourcesExample = {
    ...exampleDbLabelsResource(),
    '2.jpg': exampleLabel['1.jpg']
  }
  enchancedResourcesExample['2.jpg'][0].description = 'test'

  expect(
    findMatchingDescriptions('1.jpg', { 'Natural foods': 0.9950245022773743 }, enchancedResourcesExample)
  ).toEqual({ '2.jpg': [] })
})
