var stringSimilarity = require('string-similarity')

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
}

String.prototype.emojiID = function() {
    return this.replace(/<|>/gi, '').split(':')[2]
}

module.exports.weighted = require('./weighted')

Number.prototype.num2han =  function(){
    if(this==0) return 0

    var reg = /(^[+-]?\d+)(\d{3})/
    var n = (this.toString())

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2')

    return n
}

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
    var arrayLength = this.length
    var tempArray = []

    for (let index = 0; index < arrayLength; index += size) {
        let myChunk = this.slice(index, index + size)
        // Do something if you want with the group
        tempArray.push(myChunk)
    }

    return tempArray
}
