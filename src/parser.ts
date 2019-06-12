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

export { RequestBody, parser };
