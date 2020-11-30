export const extractDescriptions = (imgName, dbLabelsResource) => {
  const extractedDescriptions = {}
  dbLabelsResource[imgName].forEach(label => {
    extractedDescriptions[label.description] = label.score
  })
  return extractedDescriptions
}
export const findMatchingDescriptions = (
  initImg,
  comparisonObject,
  dbLabelsResource
) => {
  const res = {}
  Object.keys(dbLabelsResource).forEach(key => {
    res[key] = []
    dbLabelsResource[key].forEach(label => {
      const matchedDescriptionScoreFound = comparisonObject[label.description]
      if (
        typeof matchedDescriptionScoreFound !== 'undefined' &&
        isScoreWithinThreshold(matchedDescriptionScoreFound, label.score)
      ) {
        console.log(comparisonObject, '1', { label }, '2')
        res[key].push({ [label.description]: label.score })
      }
    })
  })
  delete res[initImg]
  return res
}
const threshold = 0.1
function isScoreWithinThreshold(comparisonScore, incomingScore) {
  if (
    incomingScore >= comparisonScore - threshold &&
    incomingScore <= comparisonScore + threshold
  ) {
    return true
  }
  return false
}
