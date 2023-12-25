const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, Admin, Course } = require("../db/index");

//mongodb+srv://kopaljain03:<vqIglvXPjsLM7vHW>@cluster0.syhlcss.mongodb.net/
mongoose.connect(
  "mongodb+srv://kopaljain03:vqIglvXPjsLM7vHW@cluster0.syhlcss.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

const secret = "kopal";

function getToken(user) {
  return jwt.sign(user, secret, { expiresIn: "1h" });
}

function getUser(token) {
  var ret;
  jwt.verify(token, secret, (err, user) => {
    if (err) ret = "invalid token";
    else ret = user;
  });
  console.log(ret);
  return ret;
}

async function adminAuth(req, res, next) {
  var token = req.headers.token.split(" ")[1];
  var jwtUser = getUser(token);
  console.log("from admin auth");
  console.log(jwtUser);
  if (jwtUser == "invalid token")
    res.status(401).json({ message: "incorrect username or password" });
  else {
    const user = await Admin.findOne({
      username: jwtUser.username,
      password: jwtUser.password,
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "incorrect username or password" });
    }
  }
}

async function userAuth(req, res, next) {
  var token = req.headers.token.split(" ")[1];
  var jwtUser = getUser(token);
  console.log("from user auth");
  console.log(jwtUser);
  if (jwtUser == "invalid token")
    res.status(401).json({ message: "incorrect username or password" });
  const user = await User.findOne({
    username: jwtUser.username,
    password: jwtUser.password,
  });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "incorrect username or password" });
  }
}

module.exports = {
  adminAuth,
  userAuth,
  getToken,
  getUser,
};
