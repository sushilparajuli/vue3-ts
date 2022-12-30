import express from "express";
import cors from "cors";
import { today, thisMonth, thisWeek, type Post } from "../posts";

const app = express();
app.use(express.json());
app.use(cors());

const allPosts = [today, thisMonth, thisWeek];
app.get("/posts", (req, res) => {
  res.json(allPosts);
});

app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 10000).toFixed()};
  allPosts.push(post);
  res.json(post);
});

app.listen(8001, () => {
  console.log("Listening on 80001");
});
