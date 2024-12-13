import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://baidsimandhar:7Geo31SJT2rSqX7Q@cluster0.zbxfw.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Admin Schema
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Course Schema
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

// Models
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
const Admin = mongoose.model("Admin", AdminSchema);

// Exporting Models
export { User, Course, Admin };
