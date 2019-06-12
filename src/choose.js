module.exports = { chooseParser, choose };

const util = require('./util.js');

function chooseParser(body) {
  const i = parseInt(body.text, 10);
  return {
    channel: body.channel_id,
    number: isNaN(i) ? 1 : i
  };
}

function choose(members, args) {
  return util.random(util.combinations(members, args.number));
}
