const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
