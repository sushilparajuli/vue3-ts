import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import { today, thisMonth, thisWeek, type Post } from "../types/posts";
import type { NewUser, User } from "../types/users";
const nanoid = require("nanoid-esm");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const allPosts = [today, thisMonth, thisWeek];
const allUsers: User[] = [];
app.get("/posts", (req, res) => {
  res.json(allPosts);
});

const SECRET = "vue-level-secret";
const COOKIE = "vuejs-jwt";

function authenticate(id: string, req: express.Request, res: express.Response) {
  // token sign
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: "vuejs-ts-app",
    expiresIn: "30 days",
  });

  //set a cookie
  res.cookie(COOKIE, token, { httpOnly: true });
}

app.get("/verify-token", (req, res) => {
  try {
    const token = req.cookies[COOKIE];
    const result = jsonwebtoken.verify(token, SECRET) as { id: string };
    console.log(result);
    res.json({
      id: result.id,
    });
  } catch (err) {
    res.status(404).end();
  }
});

app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: nanoid(5) };
  allPosts.push(post);
  res.json(post);
});

app.put<{}, {}, Post>("/posts", (req, res) => {
  const index = allPosts.findIndex((post) => post.id === req.body.id);
  if (index === -1) {
    throw Error("No post found with id " + req.body.id);
  } else {
    const existingPost = allPosts[index];
    allPosts[index] = { ...existingPost, ...req.body };
    res.json(allPosts[index]);
  }
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
  const newUser = { ...req.body, id: nanoid(10) };
  allUsers.push(newUser);
  authenticate(newUser.id, req, res);
  const { password, ...rest } = newUser;
  res.json(rest);
});

app.post<{}, {}, NewUser>("/login", (req, res) => {
  const targetUser = allUsers.find(
    (user) => user.username === req.body.username
  );
  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end();
  } else {
    authenticate(targetUser.id, req, res);
    res.status(200).end();
  }
});

app.post("/logout", (req, res) => {
  //set a empty cookie
  res.cookie(COOKIE, "", { httpOnly: true });
  res.status(200).end();
});

app.listen(8001, () => {
  // allUsers.splice(0, allUsers.length);
  console.log("Listening on 8001");
});
