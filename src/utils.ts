export interface MatchedDescriptions {
  [key:string]: []
}
const scoreThreshold = 0.1
export const extractDescriptions = (imgName:string, dbLabelsResource:{}) => {
  const extractedDescriptions = {}
  const imgLabel = dbLabelsResource[imgName] !== undefined
  if (!imgLabel) return
  dbLabelsResource[imgName].forEach(label => {
    extractedDescriptions[label.description] = label.score
  })
  return extractedDescriptions
}
export const findMatchingDescriptions = (
  initImg,
  comparisonObject,
  dbLabelsResource
): MatchedDescriptions => {
  const matches = {}
  Object.keys(dbLabelsResource).forEach(key => {
    matches[key] = []
    dbLabelsResource[key].forEach(label => {
      const matchedDescriptionScoreFound = comparisonObject[label.description]
      if (
        typeof matchedDescriptionScoreFound !== 'undefined' &&
        isScoreWithinThreshold(matchedDescriptionScoreFound, label.score, scoreThreshold)
      ) {
        matches[key].push({ [label.description]: label.score })
      }
    })
  })
  delete matches[initImg]
  return matches
}

export function isScoreWithinThreshold(comparisonScore:number, incomingScore:number, threshold):boolean {
  if ( 
    (incomingScore - threshold) <= comparisonScore && comparisonScore <= (incomingScore + threshold)
  ) {
    return true
  }
  return false
}
