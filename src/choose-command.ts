import { Request, Response } from "express";
import axios from "axios";
import * as util from "./util";

interface CmdRequest extends Request {
  body: RequestBody;
}

type RequestBody = {
  token: string;
  channel_id: string;
  text: string;
  response_url: string;
};

function parser(body: RequestBody) {
  const num = Number.parseInt(body.text, 10);
  return {
    channel: body.channel_id,
    url: body.response_url,
    number: isNaN(num) ? 1 : num
  };
}

async function chooseCommand(req: CmdRequest, res: Response) {
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
    const members = await util.fetchChannelMembers(cmdArgs.channel);
    const chosenMembers = util.choose(members, cmdArgs.number);
    reply = {
      text: `${chosenMembers.map(member => `<@${member}>`).join(" ")} chosen!`,
      response_type: "in_channel"
    };
  } catch (e) {
    reply = { text: "Sorry, something went wrong." };
  }
  axios.post(cmdArgs.url, reply);
}

export default chooseCommand;
