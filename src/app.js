const express = require("express");
const app = express();
const port = 5000;
const ApiRouter = require("./routes/index");

app.use("/api", ApiRouter);

app.listen(port, () => {
  console.log("http://localhost:5000");
  console.log(`Example app listening on port ${port}`);
});
