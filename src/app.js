const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
var multer = require("multer");
const ApiRouter = require("./routes/index");
const bodyParser = require("body-parser");
const upload = multer();

// urlenconded form
app.use(bodyParser.urlencoded({ extended: true }));

//  json form
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());

app.use("/v1/", ApiRouter);

app.listen(port, () => {
  console.log("http://localhost:5000");
  console.log(`Example app listening on port ${port}`);
});
