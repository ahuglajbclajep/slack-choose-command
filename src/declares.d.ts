type SlashCommandRequest = Omit<import("express").Request, "body"> & {
  body: {
    token: string;
    response_url: string;
    text: string;
    channel_id: string;
  };
};

type Reply = (
  | { text: string }
  | { attachments: { color: string; text: string }[] }) & {
  response_type?: "in_channel";
};
