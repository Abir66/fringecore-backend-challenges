import express from "express";
import { blockingGet, push } from "./challenge.mjs";

const app = express();

app.get("/blocking-get", async (req, res) => {
  const { key, groupId } = req.query;

  res.json(await blockingGet(key, groupId));
});

app.post("/push", express.json(), async (req, res) => {
  const { key } = req.query;
  const data = req.body;

  await push(key, data);
  res.json({
    message: "Data pushed successfully",
  });
});

app.listen(3031, "0.0.0.0", () => {
  console.log(`LISTENING ON http://0.0.0.0:3031`);
});
