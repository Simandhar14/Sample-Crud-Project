import express from "express";
import adminRouter from "./routes/Admin/admin.js";
import userRouter from "./routes/User/user.js";

const app = express();
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

const Port = 3000;

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
