const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const logger = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/User");
const routes = require("./routes/index");

require("./handlers/passport");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(cookieParser());

app.use("/", routes);

module.exports = app;
