module.exports = { random, combinations, postJSON };

const request = require('request-promise-native');

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function combinations(set, k) {
  if (set.length < k || k <= 0) return [];
  if (k === set.length) return [set];

  const combs = [];

  if (k === 1) {
    for (let i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  for (let i = 0; i < set.length - k + 1; i++) {
    const head = set.slice(i, i + 1);
    const tailcombs = combinations(set.slice(i + 1), k - 1);
    for (let j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

function postJSON(uri, body) {
  return request({ method: 'POST', uri, body, json: true });
}
