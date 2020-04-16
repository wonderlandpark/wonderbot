var stringSimilarity = require('string-similarity')

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
}

String.prototype.emojiID = function() {
  return this.replace(/<|>/gi, '').split(':')[2]
}

module.exports.weighted = require('./weighted')

Number.prototype.num2han = function() {
  if (this <= 0) return 0
  var inputNumber = this < 0 ? false : this
  var unitWords = [
    '',
    '만',
    '억',
    '조',
    '경',
    '해',
    '자',
    '양',
    '구',
    '간',
    '정',
    '재',
    '극',
    '향하사',
    '아승기',
    '나유타',
    '불가사의',
    '무량대수'
  ]
  var splitUnit = 10000
  var splitCount = unitWords.length
  var resultArray = []
  var resultString = ''

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i)
    unitResult = Math.floor(unitResult)
    if (unitResult > 0) {
      resultArray[i] = unitResult
    }
  }

  for (var a = 0; a < resultArray.length; a++) {
    if (!resultArray[a]) continue
    resultString = ' ' + String(resultArray[a]) + unitWords[a] + resultString
  }

  return resultString.replace(' ', '')
}

String.prototype.num2han = function() {
  if (this <= 0) return 0
  var inputNumber = this < 0 ? false : this
  var unitWords = [
    '',
    '만',
    '억',
    '조',
    '경',
    '해',
    '자',
    '양',
    '구',
    '간',
    '정',
    '재',
    '극',
    '향하사',
    '아승기',
    '나유타',
    '불가사의',
    '무량대수'
  ]
  var splitUnit = 10000
  var splitCount = unitWords.length
  var resultArray = []
  var resultString = ''

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i)
    unitResult = Math.floor(unitResult)
    if (unitResult > 0) {
      resultArray[i] = unitResult
    }
  }

  for (var a = 0; a < resultArray.length; a++) {
    if (!resultArray[a]) continue
    resultString = ' ' + String(resultArray[a]) + unitWords[a] + resultString
  }

  return resultString.replace(' ', '')
}

Array.prototype.search = function(text) {
  var matches = stringSimilarity.findBestMatch(text, this)

  var getSimilar = []

  for (var i in matches.ratings) {
    if (matches.ratings[i].rating > 0.2) {
      getSimilar.push({
        rating: matches.ratings[i].rating,
        element: matches.ratings[i].target
      })
    }
  }
  getSimilar.sort((a, b) => b.rating - a.rating)
  return getSimilar.splice(0, 1)
}

Array.prototype.chunkArray = function(size) {
  var index = 0
  var arrayLength = this.length
  var tempArray = []

  for (index = 0; index < arrayLength; index += size) {
    myChunk = this.slice(index, index + size)
    // Do something if you want with the group
    tempArray.push(myChunk)
  }

  return tempArray
}
