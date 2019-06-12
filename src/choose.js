module.exports = { chooseParser };

function chooseParser(body) {
  const i = parseInt(body.text, 10);
  return {
    channel: body.channel_id,
    number: isNaN(i) ? 1 : i
  };
}
