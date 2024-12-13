import usermiddleware from "../../middleware/user.js";
import { Router } from "express";
const router = Router();
import { User, Course } from "../../db/index.js";

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });

  res.json({
    msg: "User created",
  });
});

router.get("/courses", async (req, res) => {
  const response = await Course.find({});
  console.log(response);
});

router.post("/courses/:courseId", usermiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      { username: username },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
  res.json({
    msg: "Purchase complete",
  });
});

router.get("/purchasedCourses", usermiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });

  const course = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses: course,
  });
});

export default router;
