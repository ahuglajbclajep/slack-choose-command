module.exports = { random };

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
