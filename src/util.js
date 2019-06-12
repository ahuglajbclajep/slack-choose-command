module.exports = { random, combinations };

function random(array) {
  return array.length === 0 ? [] : array[Math.floor(Math.random() * array.length)];
}

function combinations(set, k) {
  if (k <= 0 || set.length < k) return [];
  if (k === set.length) return [set];
  if (k === 1) return set.map(e => [e]);

  const combs = [];
  for (let i = 0; i < set.length - k + 1; i++) {
    const head = set.slice(i, i + 1);
    combinations(set.slice(i + 1), k - 1).forEach(e => {
      combs.push(head.concat(e));
    });
  }
  return combs;
}
