module.exports = { createMessage };
const util = require('./util.js');

function createMessage(channelMembers) {
  return {
    response_type: 'in_channel',
    text: `<@${util.random(channelMembers)}> chosed!`
  };
}
