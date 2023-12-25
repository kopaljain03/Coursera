const mongoose = require("mongoose");

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

module.exports = {
  User,
  Admin,
  Course,
};
