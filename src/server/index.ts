import express from "express";
import cors from "cors";
import { today, thisMonth, thisWeek, type Post } from "../types/posts";
import type { NewUser, User } from "../types/users";
const nanoid = require("nanoid-esm");

const app = express();
app.use(express.json());
app.use(cors());

const allPosts = [today, thisMonth, thisWeek];
const allUsers: User[] = [];
app.get("/posts", (req, res) => {
  res.json(allPosts);
});

app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 10000).toFixed() };
  allPosts.push(post);
  res.json(post);
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
  const newUser = { ...req.body, id: nanoid(10) };
  allUsers.push(newUser);
  const { password, ...rest } = newUser;
  console.log(allUsers);
  res.json(rest);
});

app.listen(8001, () => {
  console.log("Listening on 8001");
});
