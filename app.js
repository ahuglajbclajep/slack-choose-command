const express = require('express');
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/client');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/lot', (req, res) => {
  if (req.body.token !== process.env.VERIFICATION_TOKEN) res.status(403).send();

  const web = new WebClient(process.env.OAUTH_TOKEN);
  web.channels.info({channel: req.body.channel_id})
    .then(channel => {
      const text = random(channel.channel.members);
      res.send({text});
    });
});

app.listen(process.env.PORT, () => console.log('App started'));


function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
