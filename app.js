const express = require('express');
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/client');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/lot', (req, res) => {
  const web = new WebClient(process.env.SLACK_TOKEN);
  web.channels.info({channel: req.body.channel_id})
    .then(channel => res.send({text: random(channel.channel.members)}));
});

app.listen(process.env.PORT, () => console.log('App started'));


function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
