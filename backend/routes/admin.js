const express = require("express");
const { User, Admin, Course } = require("../db/index");
const { adminAuth } = require("../middleware/auth");
const router = express.Router();
// Admin routes
router.post("/signup", async (req, res) => {
  var { username, password } = req.body;

  var user_already = await Admin.findOne({ username: username });
  if (user_already) res.status(409).json({ message: "User already exists" });
  else {
    const user = new Admin(req.body);
    await user.save();
    res.json({ message: "Admin created successfully" });
  }
});

router.post("/login", async (req, res) => {
  var token = getToken(req.body);
  console.log(token);
  var { username, password } = req.body;
  const user = await Admin.findOne({ username: username, password: password });
  if (user) {
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.status(401).json({ message: "incorrect username or password" });
  }
});

router.post("/courses", adminAuth, async (req, res) => {
  var course_obj = req.body;
  const course = new Course(course_obj);
  await course.save();
  res.json({ message: "Course created successfully" });
});

router.put("/courses/:courseId", adminAuth, async (req, res) => {
  var courseId = req.params.courseId;
  const course = await Course.findByIdAndUpdate(courseId, req.body);
  if (course) {
    res.json({ message: "course updated successfully" });
  } else res.status(411).json({ message: "wrong course id" });
});

router.get("/courses", adminAuth, async (req, res) => {
  const courses = await Course.find({});
  // if (courses) res.json(courses);
  // else res.json({ message: "no courses to display" });
  res.json({ courses: courses });
});

router.get("/me", adminAuth, async (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;
