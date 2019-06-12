import express, { Request } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { RequestBody, parser } from "./parser";
import * as slack from "./slack";
import * as util from "./util";

interface CmdRequest extends Request {
  body: RequestBody;
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req: CmdRequest, res) => {
  // check request & send response.
  if (req.body.token !== process.env.VERIFICATION_TOKEN) {
    res.status(403).send();
    return;
  }
  const cmdArgs = parser(req.body);
  res.send();

  // call slack api & post JSON to response_url.
  slack
    .fetchChannelMembers(cmdArgs.channel)
    .then(members => util.choose(members, cmdArgs.number))
    .then(chosenMembers => slack.createReply(chosenMembers))
    .then(reply => axios.post(cmdArgs.url, reply));
});

app.listen(process.env.PORT, () => console.log("App started"));
