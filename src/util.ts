import { WebClient, WebAPICallResult } from "@slack/web-api";

class IllegalArgumentError extends Error {
  name = this.constructor.name;
}
function randomaChoose<T>(arr: T[]) {
  if (arr.length === 0)
    throw new IllegalArgumentError(
      "You cannot choose an element from an empty array."
    );
  return arr[Math.floor(Math.random() * arr.length)];
}

function combinations<T>(set: T[], k: number) {
  if (k <= 0 || set.length < k) return [];
  if (k === set.length) return [set];
  if (k === 1) return set.map(e => [e]);

  const combs: T[][] = [];
  for (let i = 0; i < set.length - k + 1; i++) {
    const head = set.slice(i, i + 1);
    combinations(set.slice(i + 1), k - 1).forEach(e => {
      combs.push(head.concat(e));
    });
  }
  return combs;
}

const choose = <T>(arr: T[], num: number) =>
  randomaChoose(combinations(arr, num));

type ChannelsInfoResult = WebAPICallResult & { channel: { members: string[] } };
function fetchChannelMembers(channel: string) {
  const token = process.env.OAUTH_TOKEN;
  return new WebClient(token).channels
    .info({ channel })
    .then(res => (res as ChannelsInfoResult).channel.members);
}

export { choose, fetchChannelMembers };
