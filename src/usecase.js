module.exports = { channelMembers, postJSON };

const { WebClient } = require('@slack/client');
const retry = require('retry');
const request = require('request-promise-native');

function channelMembers(channel) {
  const token = process.env.OAUTH_TOKEN;
  const retryConfig = retry.operation({ retries: 5 });
  return new WebClient(token, { retryConfig }).channels.info({ channel })
    .then(res => res.channel.members)
    .catch(() => []);
}

function postJSON(uri, body) {
  console.log(body);
  return request({ method: 'POST', uri, body, json: true })
    .then(console.log('send'));
}
