const express = require('express');
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/client');
const usecase = require('./usecase.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/lot', (req, res) => {
  if (req.body.token !== process.env.VERIFICATION_TOKEN) res.status(403).send();

  const web = new WebClient(process.env.OAUTH_TOKEN);
  web.channels.info({channel: req.body.channel_id})
    .then(channel => res.send(usecase.createMessage(channel.channel.members)));
});

app.listen(process.env.PORT, () => console.log('App started'));
