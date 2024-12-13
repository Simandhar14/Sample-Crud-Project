import adminMiddleware from "../../middleware/admin.js";
import { Router } from "express";
import { Admin, Course } from "../../db/index.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });

  res.json({
    msg: "Admin created",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newcourse = await Course.create({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });

  res.json({
    msg: "Course created",
    courseid: newcourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  console.log(response);
  res.json({
    response,
  });
});

export default router;
