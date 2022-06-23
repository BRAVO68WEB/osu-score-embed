const { osuClient } = require("../helpers/osuClient");

const fetch_pp = async (username, mode) => {
  if (username === undefined) {
    username = "bravo68web";
  }
  if (mode === undefined) {
    mode = "0";
  }
  const result = await osuClient.getUser({
    u: username,
    m: mode,
  });
  return "PP: " + roundToTwo(result[0].pp_raw);
};

const fetch_acc = async (username, mode) => {
  if (username === undefined) {
    username = "bravo68web";
  }
  if (mode === undefined) {
    mode = "0";
  }
  const result = await osuClient.getUser({
    u: username,
    m: mode,
  });
  return "Acc: " + roundToTwo(result[0].accuracy);
};

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

module.exports = {
  fetch_pp,
  fetch_acc,
  roundToTwo,
};
