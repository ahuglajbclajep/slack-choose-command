import express, { Request } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { RequestBody, parser } from "./parser";
import fetchChannelMembers from "./slack";
import * as util from "./util";

interface CmdRequest extends Request {
  body: RequestBody;
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req: CmdRequest, res) => {
  // check request & send response.
  if (req.body.token !== process.env.VERIFICATION_TOKEN) {
    res.status(403).send();
    return;
  }
  const cmdArgs = parser(req.body);
  res.send();

  // call slack api & post JSON to response_url.
  let reply: { text: string; response_type?: "in_channel" };
  try {
    const members = await fetchChannelMembers(cmdArgs.channel);
    const chosenMembers = util.choose(members, cmdArgs.number);
    reply = {
      text: `${chosenMembers.map(member => `<@${member}>`).join(" ")} chosen!`,
      response_type: "in_channel"
    };
  } catch (e) {
    reply = { text: "Sorry, something went wrong." };
  }
  axios.post(cmdArgs.url, reply);
});

app.listen(process.env.PORT, () => console.log("App started"));
