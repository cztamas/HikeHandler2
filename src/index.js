"use strict";

const express = require("express");
const nconf = require("nconf").argv().env().file("./config.json");
const path = require("path");

const configFilePath = path.join(__dirname, "config.json");
nconf.argv().env().file(configFilePath);

console.log("beer", nconf.get("DB_URL"));
const dataRouter = require("./server");

const app = express();
const port = nconf.get("PORT");

app.use("/", express.static(path.join(__dirname, "client")));
app.use("/data", dataRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));
