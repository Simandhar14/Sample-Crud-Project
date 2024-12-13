import { Admin } from "../db/index.js";

async function middleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  const response = await Admin.findOne({
    username: username,
    password: password,
  });

  if (!response) {
    return res.status(403).json({ msg: "Admin does not exist" });
  } else {
    next();
  }
}

export default middleware;
