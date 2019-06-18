import { Response } from "express";
import axios from "axios";
import * as util from "./util";

class ParseError extends util.CustomError {
  message = "Parse error.";
}
function parse(argv: string) {
  const result = argv.match(
    /^\s*(?<number>\d+)?(?:\s+from(?:(?<members>(?:\s+<@\w+\|\w+>)+)|(?:\s+<#(?<channel>\w+)\|\w+>)))?\s*$/
  );
  if (!result) throw new ParseError();

  const number = result.groups!.number ? +result.groups!.number : 1;
  if (result.groups!.members) {
    const members = [...result.groups!.members.matchAll(/<@(\w+)\|\w+>/g)].map(
      result => result[1]
    );
    return { number, members };
  } else if (result.groups!.channel) {
    return { number, channel: result.groups!.channel };
  } else {
    return { number };
  }
}

async function chooseCommand(req: SlashCommandRequest, res: Response) {
  // check request & send response.
  if (req.body.token !== process.env.VERIFICATION_TOKEN) {
    res.status(403).send();
    return;
  }
  res.send();

  // call slack api & post JSON to response_url.
  let reply: Reply;
  try {
    const cmdArgs = parse(req.body.text);
    const members =
      cmdArgs.members ||
      (await util.fetchChannelMembers(cmdArgs.channel || req.body.channel_id));
    const chosenMembers = util.choose(members, cmdArgs.number);
    reply = {
      text: `${chosenMembers.map(member => `<@${member}>`).join(" ")} chosen!`,
      response_type: "in_channel"
    };
  } catch (e) {
    let text: string;
    if (e instanceof ParseError) {
      text =
        "Bad input: please see <https://github.com/ahuglajbclajep/slack-choose-command#usage|usage>.";
    } else if (e instanceof util.IllegalArgumentError) {
      text =
        "Bad input: the input numerical value is bigger than number of people.";
    } else {
      text = "Sorry, something went wrong.";
    }
    reply = util.createErrorReply(text);
  }
  axios.post(req.body.response_url, reply);
}

export default chooseCommand;
