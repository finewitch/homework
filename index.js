import dbLabelsResource from '../data.json'
import { extractDescriptions, findMatchingDescriptions } from './utils.js'

function similarImagesLookup(imageName, dbLabelsResource) {
  const comparisonObject = extractDescriptions(imageName, dbLabelsResource)
  console.log(comparisonObject, 'init')

  const matchingDescriptions = findMatchingDescriptions(
    imageName,
    comparisonObject,
    dbLabelsResource
  )

  console.log(matchingDescriptions, '<---')

  const sortMatches = Object.keys(matchingDescriptions).sort(function(
    one,
    other
  ) {
    return matchingDescriptions[other].length - matchingDescriptions[one].length
  })
  console.log(sortMatches)
  return sortMatches.slice(0, 3)
}
const matchedImages = similarImagesLookup('5.jpg', dbLabelsResource)
console.log(matchedImages)
