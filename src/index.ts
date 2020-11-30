import dbLabelsResource from '../data.json'
import { extractDescriptions, findMatchingDescriptions } from './utils.js'

function similarImagesLookup(imageName: string, dbLabelsResource:{}):Array<string> | undefined{
  const comparisonObject = extractDescriptions(imageName, dbLabelsResource)
  
  if(!comparisonObject) return

  const matchingDescriptions = findMatchingDescriptions(
    imageName,
    comparisonObject,
    dbLabelsResource
  )

  // console.log(matchingDescriptions, '<---')

  const sortedMatches: Array<string> = Object.keys(matchingDescriptions).sort(function(
    one,
    other
  ) {
    return matchingDescriptions[other].length - matchingDescriptions[one].length
  })
  // console.log(sortedMatches)
  return sortedMatches.slice(0, 3)
}
const matchedImages = similarImagesLookup('1.jpg', dbLabelsResource)
console.log(matchedImages)
