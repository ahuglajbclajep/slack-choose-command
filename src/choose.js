module.exports = { chooseParser, choose, chooseReply };

const util = require('./util.js');
const slack = require('./slack.js');

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

function chooseReply(members) {
  if (members.length === 0) return { text: 'wrong input!' };
  return slack.reply(`${members.map(member => `<@${member}>`).join(' ')} chosen!`);
}
