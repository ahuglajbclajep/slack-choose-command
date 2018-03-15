module.exports = { channelMembers, reply };

const { WebClient } = require('@slack/client');
const retry = require('retry');

function channelMembers(channel) {
  const token = process.env.OAUTH_TOKEN;
  const retryConfig = retry.operation({ retries: 5 });
  return new WebClient(token, { retryConfig }).channels.info({ channel })
    .then(res => res.channel.members)
    .catch(() => []);
}

function reply(text) {
  return { response_type: 'in_channel', text };
}
