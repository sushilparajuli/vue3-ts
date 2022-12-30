import express from "express";
import cors from "cors";
import { today, thisMonth, thisWeek } from "../posts";

const app = express();
app.use(cors());
app.get("/posts", (req, res) => {
  res.json([today, thisMonth, thisWeek]);
});

app.listen(8001, () => {
  console.log("Listening on 80001");
});
