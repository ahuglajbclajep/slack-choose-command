import { WebClient, WebAPICallResult } from "@slack/web-api";
type ChannelsInfoResult = WebAPICallResult & { channel: { members: string[] } };

function fetchChannelMembers(channel: string) {
  const token = process.env.OAUTH_TOKEN;
  return new WebClient(token).channels
    .info({ channel })
    .then(res => (res as ChannelsInfoResult).channel.members);
}

const createReply = (members: string[]) =>
  members.length === 0
    ? { text: "wrong input!" }
    : {
        text: `${members.map(member => `<@${member}>`).join(" ")} chosen!`,
        response_type: "in_channel"
      };

export { fetchChannelMembers, createReply };
