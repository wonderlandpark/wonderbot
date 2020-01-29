module.exports = function(input) {
  var array = []; // Just Checking...
  for (var item in input) {
    // eslint-disable-next-line no-prototype-builtins
    if (input.hasOwnProperty(item)) {
      // Safety
      for (var i = 0; i < input[item]; i++) {
        array.push(item);
      }
    }
  }
  return array[Math.floor(Math.random() * array.length)];
};
