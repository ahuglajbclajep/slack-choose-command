const express = require('express');
const bodyParser = require('body-parser');
const choose = require('./choose.js');
const slack = require('./slack.js');
const util = require('./util.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  // check request & send response.
  if (req.body.token !== process.env.VERIFICATION_TOKEN) {
    res.status(403).send();
    return;
  }
  const args = choose.chooseParser(req.body);
  const url = req.body.response_url;
  res.send();

  // call api & post JSON to response_url.
  slack.channelMembers(args.channel)
    .then(members => choose.choose(members, args))
    .then(members => choose.chooseReply(members))
    .then(reply => util.postJSON(url, reply));
});

app.listen(process.env.PORT, () => console.log('App started'));
