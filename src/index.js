const express = require("express");
const path = require("path");
const dataRouter = require("./server");

const app = express();
const port = 5000;

app.use("/", express.static(path.join(__dirname, "client")));
app.use("/data", dataRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));
