var stringSimilarity = require('string-similarity')

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
}

String.prototype.emojiID = function() {
  return this.replace(/<|>/gi, '').split(':')[2]
}

module.exports.weighted = require('./weighted')

Number.prototype.num2han =  function() {
  var numberic = ["","일","이","삼","사","오","육","칠","팔","구"];
  var numunit = ["","","십","백","천","만","십만","백만","천만","억","십억","백억","천억", "조",  "십조", "백조", "천조", "경", "십경", "백경", "천경","해", "십해", "백해", "천해", "자", "십자"];
  var str = "", tmp = "";
  
  var splited = [];
  for(var i = 0; i < String(this).length; i ++) {
      splited.push(String(this).substring(i, i+1));
  }

  for(var i = 0, x = String(this).length; x > 0; -- x, ++ i) {
      tmp = numberic[splited[i]];
      if(tmp) {
          if(x > 4 && numberic[splited[i + 1]]) {
              tmp += numunit[x].substring(0, 1);
          } else {
              tmp += numunit[x];
          }
      } else {
          tmp += "";
      }
      str += ' ' + tmp;
  }
  
  return str;
};

String.prototype.num2han = function(){ return Number(this).num2han() }


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
