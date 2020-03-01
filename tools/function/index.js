Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

String.prototype.emojiID = function() {
  return this.replace(/<|>/gi, '').split(':')[2];
};

module.exports.weighted = require('./weighted');

Number.prototype.num2han = function() {
  if(this <= 0) return 0;
  var inputNumber = this < 0 ? false : this;
  var unitWords = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극', '향하사', '아승기', '나유타', '불가사의', '무량대수'];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = '';

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var a = 0; a < resultArray.length; a++) {
    if (!resultArray[a]) continue;
    resultString = ' ' + String(resultArray[a]) + unitWords[a] + resultString;
  }

  return resultString.replace(' ', '');
}