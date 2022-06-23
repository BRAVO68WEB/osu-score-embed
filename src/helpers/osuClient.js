const { Osu } = require("osu-wrapper");

const client = new Osu(process.env.OSU_API_KEY);

module.exports = {
  osuClient: client,
};
