const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//schemas:

const userSchema = new mongoose.Schema({
  username: String,
  password: { type: String },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: { type: String },
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  published: Boolean,
});

const User = new mongoose.model("User", userSchema);
const Admin = new mongoose.model("Admin", adminSchema);
const Course = new mongoose.model("Course", courseSchema);

//mongodb+srv://kopaljain03:<vqIglvXPjsLM7vHW>@cluster0.syhlcss.mongodb.net/
mongoose.connect(
  "mongodb+srv://kopaljain03:vqIglvXPjsLM7vHW@cluster0.syhlcss.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);
let ADMINS = [];
let USERS = [];
let COURSES = [];

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

// Admin routes
app.post("/admin/signup", async (req, res) => {
  var { username, password } = req.body;

  var user_already = await Admin.findOne({ username: username });
  if (user_already) res.status(409).json({ message: "User already exists" });
  else {
    const user = new Admin(req.body);
    await user.save();
    res.json({ message: "Admin created successfully" });
  }
});

app.post("/admin/login", async (req, res) => {
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

app.post("/admin/courses", adminAuth, async (req, res) => {
  var course_obj = req.body;
  const course = new Course(course_obj);
  await course.save();
  res.json({ message: "Course created successfully" });
});

app.put("/admin/courses/:courseId", adminAuth, async (req, res) => {
  var courseId = req.params.courseId;
  const course = await Course.findByIdAndUpdate(courseId, req.body);
  if (course) {
    res.json({ message: "course updated successfully" });
  } else res.status(411).json({ message: "wrong course id" });
});

app.get("/admin/courses", adminAuth, async (req, res) => {
  const courses = await Course.find({});
  // if (courses) res.json(courses);
  // else res.json({ message: "no courses to display" });
  res.json({ courses: courses });
});

app.get("/admin/me", adminAuth, async (req, res) => {
  res.json({ username: req.user.username });
});
// User routes
app.post("/users/signup", async (req, res) => {
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

app.post("/users/login", async (req, res) => {
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

app.get("/users/courses", userAuth, async (req, res) => {
  const courses = await Course.find({ published: true });
  if (courses) {
    res.json(courses);
  } else res.json({ message: "no courses published" });
});

app.post("/users/courses/:courseId", userAuth, async (req, res) => {
  var courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (course) {
    const user = req.user;
    user.purchasedCourses.push(course.id);
    await user.save();
    res.json({ message: "Course purchased successfully" });
  } else res.status(404).send("course not found");
});

app.get("/users/purchasedCourses", userAuth, async (req, res) => {
  // var purchasedCourses_id = req.user.purchasedCourses;
  // var purchasedCourses = await Course.findMany({});
  const user = await req.user.populate("purchasedCourses");
  res.json(user.purchasedCourses);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
