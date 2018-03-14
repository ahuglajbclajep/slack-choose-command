const express = require('express');
const bodyParser = require('body-parser');
const usecase = require('./usecase.js');
const util = require('./util.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/lot', (req, res) => {
  if (req.body.token !== process.env.VERIFICATION_TOKEN) res.status(403).send();
  const channel = req.body.channel_id;
  const url = req.body.response_url;
  res.send();

  usecase.channelMembers(channel)
    .then(members => util.random(members))
    .then(member => ({
        response_type: 'in_channel',
        text: `<@${member}> chosed!`
      }))
    .then(message => usecase.postJSON(url, message));
});

app.listen(process.env.PORT, () => console.log('App started'));
