const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      route: "/pp",
      query: ["?=username=&&mode="],
    },
    {
      route: "/pp_acc",
      query: ["?=username=&&mode="],
    },
  ]);
});

router.use("/pp", require("./pp"));
router.use("/pp_acc", require("./pp_acc"));

module.exports = router;
