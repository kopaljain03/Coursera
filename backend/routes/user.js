const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { userAuth, getToken, getUser } = require("../middleware/auth");
const { User, Admin, Course } = require("../db/index");
const router = express.Router();

router.post("/signup", async (req, res) => {
  var { username, password } = req.body;
  console.log(req.body);
  var user_already = await User.findOne({ username: username });
  if (user_already) res.status(409).json({ message: "User already exists" });
  else {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  var token = getToken(req.headers);
  console.log(token);
  var { username, password } = req.headers;
  const user = await User.findOne({ username: username, password: password });
  if (user) {
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.status(401).json({ message: "incorrect username or password" });
  }
});

router.get("/courses", userAuth, async (req, res) => {
  const courses = await Course.find({ published: true });
  if (courses) {
    res.json(courses);
  } else res.json({ message: "no courses published" });
});

router.post("/courses/:courseId", userAuth, async (req, res) => {
  var courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (course) {
    const user = req.user;
    user.purchasedCourses.push(course.id);
    await user.save();
    res.json({ message: "Course purchased successfully" });
  } else res.status(404).send("course not found");
});

router.get("/purchasedCourses", userAuth, async (req, res) => {
  // var purchasedCourses_id = req.user.purchasedCourses;
  // var purchasedCourses = await Course.findMany({});
  const user = await req.user.populate("purchasedCourses");
  res.json(user.purchasedCourses);
});

module.exports = router;
